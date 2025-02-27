"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "@/utils/api";
import { MultiSelectCategory } from "./mutil-select-category";
import { ImageUpload } from "./image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DynamicForm } from "./dynamic-form";
import { ReusableDynamicForm, FieldConfig } from "./dynamic-form copy";

const attributeFields: FieldConfig[] = [
  { name: "size", label: "Kích cỡ", placeholder: "Chọn kích cỡ" },
  { name: "price", label: "Giá", placeholder: "Nhập giá bán", type: "number" },
  { name: "discount_price", label: "Giá khuyến mãi", placeholder: "Nhập giá khuyến mãi", type: "number" },
  { name: "some_f", label: "some_f", placeholder: "some_f", type: "number" },
];

const units = ["Bó", "Chiếc", "Hộp", "Bình", "Túi"];

const getCategories = async () => {
  const res = await api.get("/product-categories");
  return res.status === 200 ? res.data.data : [];
};

export default function AddProductForm() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<{ _id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ _id: number; name: string; parent_id: number | null }[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [attributes, setAttributes] = useState<Record<string, any>[]>([]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    // wholesale_price: "",
    retail_price: "",
    unit: "",
    stock_quantity: "",
    is_feature: false,
    is_public: false,
    // status: "Còn hàng",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (selectedIds: number[]) => {
    const selectedCategoryObjects = selectedIds.map((id) => {
      const category = categories.find((cat) => cat._id === id);
      return { _id: id, name: category ? category.name : "" };
    });
    setSelectedCategories(selectedCategoryObjects);
  };

  const handleImageChange = (newImages: File[]) => {
    setImages(newImages);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (index: number) => {
    setAvatarIndex(index);
  };

  const handleAttributesChange = (attrs: Record<string, any>[]) => {
    const newAttributes = attrs.map((attr) => {
      return {
        ...attr,
        price: Number(attr.price),
        discount_price: Number(attr.discount_price),
      };
    });

    console.log("Attributes changed:", attrs);

    setAttributes(newAttributes);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // setIsSubmitting(true);

    const newProduct = {
      ...productData,
      // wholesale_price: Number(productData.wholesale_price),
      retail_price: Number(productData.retail_price),
      // stock_quantity: Number(productData.stock_quantity),
      categories: selectedCategories,
      attributes: attributes,
    };

    if (newProduct.unit === "") {
      toast.warning("Vui lòng chọn đơn vị cho sản phẩm", { duration: 2000 });
      return;
    }

    if (newProduct.categories.length === 0) {
      toast.warning("Vui lòng chọn ít nhất 1 danh mục", { duration: 2000 });
      return;
    }

    try {
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error instanceof Error ? error.message : "Có lỗi xảy ra, vui lòng thử lại!", { duration: 8000 });
    }

    try {
      // Gửi thông tin sản phẩm
      const res = await api.post("/product", newProduct);
      if (res.status !== 201) throw new Error("Không thể tạo sản phẩm");

      // for api
      // const productId = res.data.data.product._id;
      // const productSlug = res.data.data.product.slug;

      // for testing
      const productId = 1;

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image, index) => {
          formData.append("images", image);
          if (index === avatarIndex) {
            formData.append("avatar", String(avatarIndex));
          }
        });

        const imageRes = await api.post(`/product/${productId}/images`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (imageRes.status !== 200) throw new Error("Lỗi khi tải ảnh lên");

        toast.success(`Sản phẩm và ${images.length} hình ảnh đã được tải lên thành công!`, {
          duration: 8000,
          action: {
            label: "Xem sản phẩm",
            // onClick: () => router.push(`/dashboard/products/${productSlug}`),
            onClick: () => console.log("Xem sản phẩm"),
          },
        });
      } else {
        toast.success(`Sản phẩm được tạo mới thành công! ${JSON.stringify(newProduct)}`, {
          duration: 8000,
          action: {
            label: "Xem sản phẩm",
            // onClick: () => router.push(`/dashboard/products/${productSlug}`),
            onClick: () => console.log("Xem sản phẩm"),
          },
        });
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error instanceof Error ? error.message : "Có lỗi xảy ra, vui lòng thử lại!", { duration: 8000 });
    }

    // router.push(`/dashboard/products`);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Tên sản phẩm</Label>
        <Input id="name" name="name" value={productData.name} onChange={handleChange} required />
        <div className="flex items-center gap-2">
          <Label htmlFor="is_feature">Sản phẩm nổi bật</Label>
          <Switch
            id="is_feature"
            checked={productData.is_feature}
            onCheckedChange={(checked) => setProductData({ ...productData, is_feature: checked })}
          />
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="is_feature">Công khai sản phẩm</Label>
          <Switch
            id="is_feature"
            checked={productData.is_public}
            onCheckedChange={(checked) => setProductData({ ...productData, is_public: checked })}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="retail_price">Đơn vị tính</Label>
        <Select onValueChange={(value) => setProductData({ ...productData, unit: value })} value={productData.unit} required>
          <SelectTrigger id="unit">
            <SelectValue placeholder="Chọn đơn vị" />
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

      <div className="grid gap-2">
        <Label htmlFor="retail_price">Giá bán</Label>
        <Input type="number" id="retail_price" name="retail_price" value={productData.retail_price} onChange={handleChange} required />
      </div>
      {/* <div className="grid gap-2">
        <Label htmlFor="wholesale_price">Giá bán buôn</Label>
        <Input type="number" id="wholesale_price" name="wholesale_price" value={productData.wholesale_price} onChange={handleChange} required />
      </div> */}
      <div className="grid gap-2">
        <Label htmlFor="categories">Danh mục sản phẩm</Label>
        <MultiSelectCategory options={categories} onValueChange={handleCategoryChange} defaultValue={selectedCategories.map((cat) => cat._id)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Mô tả sản phẩm</Label>
        <Textarea id="description" name="description" value={productData.description} onChange={handleChange} required />
      </div>
      {/* <div className="grid gap-2">
        <Label htmlFor="attributes">Thuộc tính sản phẩm</Label>
        <DynamicForm />
        <ReusableDynamicForm fields={attributeFields} onChange={handleAttributesChange} />
      </div> */}
      <div>
        <Label className="text-sm font-medium">Hình ảnh sản phẩm</Label>
        <ImageUpload images={images} onImagesChange={handleImageChange} onAvatarChange={handleAvatarChange} avatarIndex={avatarIndex} />
      </div>
      <Button type="submit" className="mt-4" disabled={isSubmitting}>
        {isSubmitting ? "Đang xử lý..." : "Thêm sản phẩm"}
      </Button>
    </form>
  );
}
