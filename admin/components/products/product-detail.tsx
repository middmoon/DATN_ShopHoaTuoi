"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { X, Check, Trash2, PlusCircle, ImagePlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { MultiSelectCategory } from "./add-new-product/mutil-select-category";
import { api } from "@/utils/api";

const units = ["Bó", "Chiếc", "Hộp", "Bình", "Túi", "Giỏ"];

interface ProductImage {
  _id: number;
  img_url: string;
  is_avatar: boolean;
}

interface ProductCategory {
  _id: number;
  name: string;
}

type StatusType = "Còn hàng" | "Hết hàng" | "Ngưng kinh doanh";

interface Product {
  _id: number;
  name: string;
  unit: string | null;
  description: string;
  retail_price: number;
  status: StatusType;
  slug: string;
  is_feature: boolean;
  stock_quantity?: number;
  is_public: boolean;
  createdAt: string;
  updatedAt: string;
  ProductCategories: ProductCategory[];
  ProductImages: ProductImage[];
}

interface ProductDetailProps {
  product: Product;
  availableCategories?: ProductCategory[];
}

interface EditedProductFields {
  name?: string;
  unit?: string | null;
  description?: string;
  retail_price?: number;
  status?: StatusType;
  is_public?: boolean;
  is_feature?: boolean;
}

interface CategoryChanges {
  newCategories: number[]; // Chỉ gửi ID của danh mục mới
  removedCategoryIds: number[];
}

interface ImageChanges {
  newImages: File[]; // Hình ảnh mới để gửi trong FormData
  removedImageIds: number[]; // ID của hình ảnh bị xóa
  newAvatarId?: number; // ID của ảnh avatar mới
}

const getCategories = async () => {
  const res = await api.get("/product-categories");
  return res.status === 200 ? res.data.data : [];
};

export function ProductDetail({ product, availableCategories = [] }: ProductDetailProps) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(product.ProductCategories);
  const [removedCategoryIds, setRemovedCategoryIds] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<{ _id: number; name: string; parent_id: number | null }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const allCategories = [...availableCategories];
  product.ProductCategories.forEach((cat) => {
    if (!allCategories.some((c) => c._id === cat._id)) {
      allCategories.push(cat);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: Number.parseFloat(value) }));
  };

  const handleToggleChange = (name: string) => (checked: boolean) => {
    setEditedProduct((prev) => ({ ...prev, [name]: checked }));
  };

  const handleStatusChange = (value: StatusType) => {
    setEditedProduct((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  const handleStatusUnit = (value: string) => {
    setEditedProduct((prevState) => ({
      ...prevState,
      unit: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...filesArray]);
      const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
      setNewImagePreviews((prev) => [...prev, ...previewUrls]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(newImagePreviews[index]);
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageId: number) => {
    setEditedProduct((prev) => ({
      ...prev,
      ProductImages: prev.ProductImages.filter((img) => img._id !== imageId),
    }));
    setRemovedImageIds((prev) => [...prev, imageId]);
  };

  const setImageAsAvatar = (imageId: number) => {
    setEditedProduct((prev) => ({
      ...prev,
      ProductImages: prev.ProductImages.map((img) => ({
        ...img,
        is_avatar: img._id === imageId,
      })),
    }));
  };

  const removeCategory = (categoryId: number) => {
    setSelectedCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
    if (categoryId > 0) {
      setRemovedCategoryIds((prev) => [...prev, categoryId]);
    }
  };

  const handleCategoryChange = (selectedIds: number[]) => {
    const selectedCategoryObjects = selectedIds.map((id) => {
      const category = categories.find((cat) => cat._id === id);
      return { _id: id, name: category ? category.name : "" };
    });
    setSelectedCategories(selectedCategoryObjects);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Edited Product: Các trường cơ bản đã thay đổi
    const changedProductFields: EditedProductFields = {};
    const fieldsToCheck = ["name", "unit", "description", "retail_price", "status", "is_public", "is_feature"] as const;

    fieldsToCheck.forEach((field) => {
      if (editedProduct[field] !== product[field]) {
        changedProductFields[field] = editedProduct[field] as any;
      }
    });

    // 2 & 3. New Categories & Remove Categories
    const originalCategoryIds = new Set(product.ProductCategories.map((cat) => cat._id));
    const newCategoryIds = new Set(selectedCategories.map((cat) => cat._id));

    // Tìm danh mục mới (có trong selectedCategories nhưng không có trong product.ProductCategories)
    const newCategories = Array.from(newCategoryIds).filter((id) => !originalCategoryIds.has(id));
    // Tìm danh mục bị xóa (có trong product.ProductCategories nhưng không có trong selectedCategories)
    const removedCategoryIdsSet = Array.from(originalCategoryIds).filter((id) => !newCategoryIds.has(id));

    const categoryChanges: CategoryChanges = {
      newCategories,
      removedCategoryIds: removedCategoryIdsSet.length > 0 ? removedCategoryIdsSet : removedCategoryIds,
    };

    // 4, 5 & 6. New Images, Remove Images & New Avatar
    const originalAvatarId = product.ProductImages.find((img) => img.is_avatar)?._id;
    const newAvatarId = editedProduct.ProductImages.find((img) => img.is_avatar)?._id;

    const imageChanges: ImageChanges = {
      newImages,
      removedImageIds,
      newAvatarId: newAvatarId !== originalAvatarId ? newAvatarId : undefined, // Chỉ gửi nếu avatar thay đổi
    };

    // // Console log để kiểm tra dữ liệu
    // console.log("1. Edited Product:", changedProductFields);

    // console.log("2. New Categories:", categoryChanges.newCategories);
    // console.log("3. Removed Categories:", categoryChanges.removedCategoryIds);

    // console.log("4. New Images:", imageChanges.newImages);
    // console.log("5. Removed Images:", imageChanges.removedImageIds);
    // console.log("6. New Avatar:", imageChanges.newAvatarId);

    // Thêm dữ liệu JSON vào FormData
    const payload = {
      changedProductFields,
      categoryChanges,
      imageChanges: {
        removedImageIds,
        newAvatarId: imageChanges.newAvatarId, // Nếu có thay đổi avatar
      },
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(payload));

    // Thêm ảnh vào FormData (Gửi riêng nhưng chung API)
    newImages.forEach((file) => {
      formData.append("newImages", file);
    });
    try {
      if (
        Object.keys(changedProductFields).length === 0 &&
        categoryChanges.newCategories.length === 0 &&
        categoryChanges.removedCategoryIds.length === 0 &&
        imageChanges.removedImageIds.length === 0 &&
        imageChanges.newAvatarId === undefined &&
        imageChanges.newImages.length === 0
      ) {
        toast.warning("Bạn không có thay đổi nào được thực hiện");
      } else {
        const response = await api.patch(`/product/${product._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        const updatedProduct = response.data.data;
        const newSlug = updatedProduct.slug;
        router.push(`/dashboard/products/${newSlug}`);
        router.refresh();
        toast.success("Sản phẩm đã được cập nhật thành công!");
        setEditMode(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    const formattedDate = new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedDate.replace(/^(\w)/, (c) => c.toUpperCase());
  };

  return (
    <div className="w-full space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{editMode ? "Chỉnh sửa sản phẩm" : product.name}</h1>
        {!editMode && <Button onClick={() => setEditMode(true)}>Chỉnh sửa</Button>}
      </div>

      {!editMode && (
        <Carousel className="w-full max-w-xs mx-auto mb-8">
          <CarouselContent>
            {product.ProductImages.sort((a, b) => (b.is_avatar ? 1 : 0) - (a.is_avatar ? 1 : 0)) // Sắp xếp is_avatar lên đầu
              .map((image) => (
                <CarouselItem key={image._id}>
                  <div className="relative aspect-square">
                    <Image
                      src={image.img_url || "/placeholder.svg?height=300&width=300"}
                      alt={`${product.name} - Image`}
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={image.is_avatar}
                    />
                    {image.is_avatar && <Badge className="absolute top-2 right-2 z-10 bg-[hsl(var(--create))]">Avatar</Badge>}
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Thông tin sản phẩm</h2>
              <div>
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input id="name" name="name" value={editedProduct.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="unit">Đơn vị</Label>
                <Select onValueChange={handleStatusUnit} defaultValue={product.unit ?? undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder={product.unit ?? "Chọn đơn vị"} />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleChange}
                  className="min-h-[120px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="retail_price">Giá bán lẻ (VND)</Label>
                <Input
                  type="number"
                  id="retail_price"
                  name="retail_price"
                  value={editedProduct.retail_price}
                  onChange={handleNumberChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select onValueChange={handleStatusChange} defaultValue={editedProduct.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Còn hàng">Còn hàng</SelectItem>
                    <SelectItem value="Hết hàng">Hết hàng</SelectItem>
                    <SelectItem value="Ngưng kinh doanh">Ngưng kinh doanh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_public"
                  checked={editedProduct.is_public}
                  onCheckedChange={handleToggleChange("is_public")}
                  style={{
                    backgroundColor: editedProduct.is_public ? "hsl(var(--create))" : "hsl(var(--muted))",
                  }}
                />
                <Label htmlFor="is_public">Công khai</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_feature"
                  checked={editedProduct.is_feature}
                  onCheckedChange={handleToggleChange("is_feature")}
                  style={{
                    backgroundColor: editedProduct.is_feature ? "hsl(var(--create))" : "hsl(var(--muted))",
                  }}
                />
                <Label htmlFor="is_feature">Nổi bật</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Danh mục sản phẩm</h2>
                <MultiSelectCategory
                  options={categories}
                  onValueChange={handleCategoryChange}
                  defaultValue={selectedCategories.map((cat) => cat._id)}
                  modalPopover={true}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Hình ảnh sản phẩm</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {editedProduct.ProductImages.map((image) => (
                    <Card key={image._id} className="relative overflow-hidden">
                      <CardContent className="p-2">
                        <div className="relative aspect-square">
                          <Image
                            src={image.img_url || "/placeholder.svg?height=200&width=200"}
                            alt="Product image"
                            fill
                            className="rounded-md object-cover"
                          />
                          {image.is_avatar && (
                            <div className="absolute top-1 left-1 bg-[hsl(var(--create))] text-white text-xs px-2 py-0.5 rounded-md">Avatar</div>
                          )}
                          <div className="absolute bottom-1 right-1 flex gap-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="secondary" className="h-8 w-8">
                                  <span className="sr-only">Open menu</span>
                                  <span className="text-xs">⋮</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!image.is_avatar && (
                                  <DropdownMenuItem onClick={() => setImageAsAvatar(image._id)}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Đặt làm avatar
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => removeExistingImage(image._id)} className="text-destructive focus:text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Xóa ảnh
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {newImagePreviews.map((preview, index) => (
                    <Card key={`new-${index}`} className="relative overflow-hidden">
                      <CardContent className="p-2">
                        <div className="relative aspect-square">
                          <Image src={preview || "/placeholder.svg"} alt="New product image" fill className="rounded-md object-cover" />
                          <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-md">New</div>
                          <Button size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6" onClick={() => removeNewImage(index)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => fileInputRef.current?.click()}>
                    <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                      <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Thêm ảnh mới</p>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" multiple className="hidden" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="actions">
              Lưu thay đổi
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          <div className="bg-muted/30 rounded-lg p-6 border border-[hsl(var(--backgound))]">
            <h2 className="text-xl font-semibold mb-3">Mô tả sản phẩm</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-6 border border-[hsl(var(--backgound))]">
            <h2 className="text-xl font-semibold mb-3">Danh mục</h2>
            <div className="flex flex-wrap gap-2">
              {product.ProductCategories.map((category) => (
                <Badge key={category._id} variant="secondary" className="px-3 py-1 text-sm bg-[hsl(var(--actions))] pointer-events-none">
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Thông tin chi tiết</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg overflow-hidden border shadow-sm border-[hsl(var(--backgound))]">
                <div className="bg-primary/10 p-3 border-b">
                  <h3 className="font-medium text-primary">Giá bán lẻ</h3>
                </div>
                <div className="p-4">
                  <p className="text-2xl font-bold text-primary border-[hsl(var(--backgound))]">{product.retail_price.toLocaleString()} VND</p>
                </div>
              </div>
              <div className="bg-card rounded-lg overflow-hidden border shadow-sm border-[hsl(var(--backgound))]">
                <div className="bg-muted p-3 border-b">
                  <h3 className="font-medium">Trạng thái</h3>
                </div>
                <div className="p-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === "Còn hàng"
                        ? "bg-green-100 text-green-800"
                        : product.status === "Hết hàng"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
              <div className="bg-card rounded-lg overflow-hidden border shadow-sm border-[hsl(var(--backgound))]">
                <div className="bg-muted p-3 border-b">
                  <h3 className="font-medium">Hiển thị</h3>
                </div>
                <div className="p-4 flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${product.is_public ? "bg-green-500" : "bg-red-500"}`}></div>
                  <p className="text-lg">{product.is_public ? "Công khai" : "Không công khai"}</p>
                </div>
              </div>
              <div className="bg-card rounded-lg overflow-hidden border shadow-sm border-[hsl(var(--backgound))]">
                <div className="bg-muted p-3 border-b">
                  <h3 className="font-medium">Nổi bật</h3>
                </div>
                <div className="p-4 flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${product.is_feature ? "bg-green-500" : "bg-red-500"}`}></div>
                  <p className="text-lg">{product.is_feature ? "Có" : "Không"}</p>
                </div>
              </div>
              {product.unit && (
                <div className="bg-card rounded-lg overflow-hidden border shadow-sm border-[hsl(var(--backgound))]">
                  <div className="bg-muted p-3 border-b">
                    <h3 className="font-medium">Đơn vị</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-lg">{product.unit}</p>
                  </div>
                </div>
              )}
              <div className="bg-card rounded-lg overflow-hidden border shadow-sm border-[hsl(var(--backgound))]">
                <div className="bg-muted p-3 border-b">
                  <h3 className="font-medium">Slug</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm font-mono bg-muted/50 p-2 rounded overflow-x-auto">{product.slug}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg overflow-hidden border shadow-sm border-[hsl(var(--backgound))]">
            <div className="bg-muted p-3 border-b">
              <h3 className="font-medium">Thời gian</h3>
            </div>
            <div className="divide-y">
              <div className="p-4 flex items-center gap-2">
                <span className="font-medium text-muted-foreground">Ngày tạo: </span>
                <p className="font-medium">{formatDate(product.createdAt)}</p>
              </div>
              <div className="p-4 flex items-center gap-2">
                <span className="font-medium text-muted-foreground">Cập nhật lần cuối: </span>
                <p className="font-medium">{formatDate(product.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
