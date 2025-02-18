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

const getCategories = async () => {
  const res = await api.get("/product-categories");
  return res.status === 200 ? res.data.data : [];
};

export default function AddProductForm() {
  const router = useRouter();

  // const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{ _id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ _id: number; name: string; parent_id: number | null }[]>([]);

  const [images, setImages] = useState<File[]>([]);
  const [avatarIndex, setAvatarIndex] = useState(0);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    wholesale_price: "",
    retail_price: "",
    stock_quantity: "",
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct = {
      ...productData,
      wholesale_price: Number(productData.wholesale_price),
      retail_price: Number(productData.retail_price),
      stock_quantity: Number(productData.stock_quantity),
      categories: selectedCategories,
    };

    try {
      // Gửi thông tin sản phẩm
      const res = await api.post("/product", newProduct);
      if (res.status !== 201) throw new Error("Không thể tạo sản phẩm");

      const productId = res.data.data.product._id;
      const productSlug = res.data.data.product.slug;
      // const productId = 1;

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
            onClick: () => router.push(`/dashboard/products/${productSlug}`),
          },
        });

        // toast.success(`Sản phẩm và ${images.length} hình ảnh đã được tải lên thành công! :::::::::: ${avatarIndex} :::: ${typeof avatarIndex}`, {
        //   duration: 8000,
        //   action: {
        //     label: "Xem sản phẩm",
        //     onClick: () => router.push(`/dashboard/products/${productSlug}`),
        //   },
        // });
      } else {
        toast.success(`Sản phẩm được tạo mới thành công! ${productSlug}`, {
          duration: 8000,
          action: {
            label: "Xem sản phẩm",
            onClick: () => router.push(`/dashboard/products/${productSlug}`),
          },
        });
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error instanceof Error ? error.message : "Có lỗi xảy ra, vui lòng thử lại!", { duration: 8000 });
    }

    router.push(`/dashboard/products`);
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const newProduct = {
  //     ...productData,
  //     wholesale_price: Number(productData.wholesale_price),
  //     retail_price: Number(productData.retail_price),
  //     stock_quantity: Number(productData.stock_quantity),
  //     categories: selectedCategories,
  //   };

  //   try {
  //     const res = await api.post("/product", newProduct);

  //     if (res.status === 201) {
  //       toast.message("Sản phẩm đã được thêm thành công", {
  //         duration: 4000,
  //         action: {
  //           label: "Xem sản phẩm",
  //           onClick: () => router.push(`/products/${res.data.data._id}`),
  //         },
  //       });
  //     }

  //     if (res.status === 201 && images.length > 0) {
  //       const formData = new FormData();
  //       images.forEach((image, index) => {
  //         formData.append("images", image);
  //         if (index === avatarIndex) {
  //           formData.append("avatar", "true");
  //         }
  //       });

  //       const imageRes = await api.post(`/product/${res.data._id}/images`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });

  //       if (imageRes.status === 200) {
  //         toast.success("Sản phẩm và ảnh đã được thêm thành công", {
  //           duration: 4000,
  //           action: {
  //             label: "Xem sản phẩm",
  //             onClick: () => router.push(`/products/${res.data.data._id}`),
  //           },
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Có lỗi xảy ra khi thêm sản phẩm, vui lòng thử lại!", { duration: 4000 });
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Tên sản phẩm</Label>
        <Input id="name" name="name" value={productData.name} onChange={handleChange} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Mô tả sản phẩm</Label>
        <Textarea id="description" name="description" value={productData.description} onChange={handleChange} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="wholesale_price">Giá bán buôn</Label>
        <Input type="number" id="wholesale_price" name="wholesale_price" value={productData.wholesale_price} onChange={handleChange} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="retail_price">Giá bán lẻ</Label>
        <Input type="number" id="retail_price" name="retail_price" value={productData.retail_price} onChange={handleChange} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="categories">Danh mục sản phẩm</Label>
        <MultiSelectCategory options={categories} onValueChange={handleCategoryChange} defaultValue={selectedCategories.map((cat) => cat._id)} />
      </div>
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
