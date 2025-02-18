"use client";

import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductImage {
  _id: number;
  img_url: string;
  is_avatar: boolean;
}

interface ProductCategory {
  _id: number;
  name: string;
}

interface Product {
  _id: number;
  name: string;
  unit: string | null;
  description: string;
  wholesale_price: number;
  retail_price: number;
  status: "Còn hàng" | "Hết hàng" | "Ngưng kinh doanh";
  slug: string;
  is_featured: boolean;
  stock_quantity: number;
  is_public: boolean;
  createdAt: string;
  updatedAt: string;
  ProductCategories: ProductCategory[];
  ProductImages: ProductImage[];
}

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string) => (checked: boolean) => {
    setEditedProduct((prev) => ({ ...prev, [name]: checked }));
  };

  const handleStatusChange = (value: string) => {
    setEditedProduct((prev) => ({ ...prev, status: value as Product["status"] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedProduct),
      });
      if (response.ok) {
        toast.success("Product updated successfully");
        setEditMode(false);
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    // <div className="container mx-auto py-10">
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>{editMode ? "Edit Product" : product.name}</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <Carousel className="w-full max-w-xs mx-auto mb-8">
    //         <CarouselContent>
    //           {product.ProductImages.map((image) => (
    //             <CarouselItem key={image._id}>
    //               <div className="p-1">
    //                 <Image
    //                   src={image.img_url || "/placeholder.svg"}
    //                   alt={product.name}
    //                   width={400}
    //                   height={400}
    //                   className="rounded-lg object-cover w-full h-64"
    //                 />
    //                 {image.is_avatar && <Badge className="absolute top-2 right-2">Avatar</Badge>}
    //               </div>
    //             </CarouselItem>
    //           ))}
    //         </CarouselContent>
    //         <CarouselPrevious />
    //         <CarouselNext />
    //       </Carousel>

    //       {editMode ? (
    //         <form onSubmit={handleSubmit} className="space-y-4">
    //           <div>
    //             <Label htmlFor="name">Product Name</Label>
    //             <Input id="name" name="name" value={editedProduct.name} onChange={handleChange} required />
    //           </div>
    //           <div>
    //             <Label htmlFor="description">Description</Label>
    //             <Textarea id="description" name="description" value={editedProduct.description} onChange={handleChange} required />
    //           </div>
    //           <div className="grid grid-cols-2 gap-4">
    //             <div>
    //               <Label htmlFor="wholesale_price">Wholesale Price</Label>
    //               <Input
    //                 type="number"
    //                 id="wholesale_price"
    //                 name="wholesale_price"
    //                 value={editedProduct.wholesale_price}
    //                 onChange={handleChange}
    //                 required
    //               />
    //             </div>
    //             <div>
    //               <Label htmlFor="retail_price">Retail Price</Label>
    //               <Input type="number" id="retail_price" name="retail_price" value={editedProduct.retail_price} onChange={handleChange} required />
    //             </div>
    //           </div>
    //           <div>
    //             <Label htmlFor="stock_quantity">Stock Quantity</Label>
    //             <Input
    //               type="number"
    //               id="stock_quantity"
    //               name="stock_quantity"
    //               value={editedProduct.stock_quantity}
    //               onChange={handleChange}
    //               required
    //             />
    //           </div>
    //           <div>
    //             <Label htmlFor="status">Status</Label>
    //             <Select onValueChange={handleStatusChange} defaultValue={editedProduct.status}>
    //               <SelectTrigger>
    //                 <SelectValue placeholder="Select status" />
    //               </SelectTrigger>
    //               <SelectContent>
    //                 <SelectItem value="Còn hàng">Còn hàng</SelectItem>
    //                 <SelectItem value="Hết hàng">Hết hàng</SelectItem>
    //                 <SelectItem value="Ngưng kinh doanh">Ngưng kinh doanh</SelectItem>
    //               </SelectContent>
    //             </Select>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <Switch id="is_public" checked={editedProduct.is_public} onCheckedChange={handleToggleChange("is_public")} />
    //             <Label htmlFor="is_public">Public</Label>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <Switch id="is_featured" checked={editedProduct.is_featured} onCheckedChange={handleToggleChange("is_featured")} />
    //             <Label htmlFor="is_featured">Featured</Label>
    //           </div>
    //           <div className="flex justify-end space-x-2">
    //             <Button type="submit" variant="default">
    //               Save Changes
    //             </Button>
    //             <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
    //               Cancel
    //             </Button>
    //           </div>
    //         </form>
    //       ) : (
    //         <div className="space-y-6">
    //           <div>
    //             <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
    //             <div className="flex flex-wrap gap-2 mb-4">
    //               {product.ProductCategories.map((category) => (
    //                 <Badge key={category._id} variant="secondary">
    //                   {category.name}
    //                 </Badge>
    //               ))}
    //             </div>
    //             <p className="text-gray-600">{product.description}</p>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4">
    //             <div>
    //               <p className="font-semibold">Wholesale Price</p>
    //               <p className="text-lg">{product.wholesale_price.toLocaleString()} VND</p>
    //             </div>
    //             <div>
    //               <p className="font-semibold">Retail Price</p>
    //               <p className="text-lg">{product.retail_price.toLocaleString()} VND</p>
    //             </div>
    //             <div>
    //               <p className="font-semibold">Stock Quantity</p>
    //               <p className="text-lg">{product.stock_quantity}</p>
    //             </div>
    //             <div>
    //               <p className="font-semibold">Status</p>
    //               <p className="text-lg">{product.status}</p>
    //             </div>
    //             <div>
    //               <p className="font-semibold">Visibility</p>
    //               <p className="text-lg">{product.is_public ? "Public" : "Private"}</p>
    //             </div>
    //             <div>
    //               <p className="font-semibold">Featured</p>
    //               <p className="text-lg">{product.is_featured ? "Yes" : "No"}</p>
    //             </div>
    //           </div>
    //           <div>
    //             <p className="font-semibold">Slug</p>
    //             <p className="text-lg">{product.slug}</p>
    //           </div>
    //           <div>
    //             <p className="font-semibold">Created At</p>
    //             <p className="text-lg">{formatDate(product.createdAt)}</p>
    //           </div>
    //           <div>
    //             <p className="font-semibold">Last Updated</p>
    //             <p className="text-lg">{formatDate(product.updatedAt)}</p>
    //           </div>
    //           <Button onClick={() => setEditMode(true)} className="w-full">
    //             Edit Product
    //           </Button>
    //         </div>
    //       )}
    //     </CardContent>
    //   </Card>
    // </div>

    <div className="w-full space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{editMode ? "Edit Product" : product.name}</h1>
        {!editMode && <Button onClick={() => setEditMode(true)}>Edit Product</Button>}
      </div>

      <Carousel className="w-full max-w-xs mx-auto mb-8">
        <CarouselContent>
          {product.ProductImages.map((image) => (
            <CarouselItem key={image._id}>
              <div className="relative aspect-square">
                <Image
                  src={image.img_url || "/placeholder.svg"}
                  alt={`${product.name} - Image`}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={image.is_avatar}
                />
                {image.is_avatar && <Badge className="absolute top-2 right-2 z-10">Avatar</Badge>}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" value={editedProduct.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={editedProduct.description} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="wholesale_price">Wholesale Price</Label>
              <Input
                type="number"
                id="wholesale_price"
                name="wholesale_price"
                value={editedProduct.wholesale_price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="retail_price">Retail Price</Label>
              <Input type="number" id="retail_price" name="retail_price" value={editedProduct.retail_price} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <Label htmlFor="stock_quantity">Stock Quantity</Label>
            <Input type="number" id="stock_quantity" name="stock_quantity" value={editedProduct.stock_quantity} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={handleStatusChange} defaultValue={editedProduct.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Còn hàng">Còn hàng</SelectItem>
                <SelectItem value="Hết hàng">Hết hàng</SelectItem>
                <SelectItem value="Ngưng kinh doanh">Ngưng kinh doanh</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="is_public" checked={editedProduct.is_public} onCheckedChange={handleToggleChange("is_public")} />
            <Label htmlFor="is_public">Public</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="is_featured" checked={editedProduct.is_featured} onCheckedChange={handleToggleChange("is_featured")} />
            <Label htmlFor="is_featured">Featured</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit" variant="default">
              Save Changes
            </Button>
            <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {product.ProductCategories.map((category) => (
              <Badge key={category._id} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
          <p className="text-gray-600">{product.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Wholesale Price</p>
              <p className="text-lg">{product.wholesale_price.toLocaleString()} VND</p>
            </div>
            <div>
              <p className="font-semibold">Retail Price</p>
              <p className="text-lg">{product.retail_price.toLocaleString()} VND</p>
            </div>
            <div>
              <p className="font-semibold">Stock Quantity</p>
              <p className="text-lg">{product.stock_quantity}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p className="text-lg">{product.status}</p>
            </div>
            <div>
              <p className="font-semibold">Visibility</p>
              <p className="text-lg">{product.is_public ? "Public" : "Private"}</p>
            </div>
            <div>
              <p className="font-semibold">Featured</p>
              <p className="text-lg">{product.is_featured ? "Yes" : "No"}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">Slug</p>
            <p className="text-lg">{product.slug}</p>
          </div>
          <div>
            <p className="font-semibold">Created At</p>
            <p className="text-lg">{formatDate(product.createdAt)}</p>
          </div>
          <div>
            <p className="font-semibold">Last Updated</p>
            <p className="text-lg">{formatDate(product.updatedAt)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";

// interface Product {
//   _id: number;
//   name: string;
//   description: string;
//   wholesale_price: number;
//   retail_price: number;
//   status: "Còn hàng" | "Hết hàng" | "Ngưng kinh doanh";
//   stock_quantity: number;
//   ProductImages: { img_url: string; is_avatar: boolean }[];
// }

// interface ProductDetailProps {
//   product: Product;
// }

// export function ProductDetail({ product }: ProductDetailProps) {
//   const [editMode, setEditMode] = useState(false);
//   const [editedProduct, setEditedProduct] = useState(product);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setEditedProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleStatusChange = (value: string) => {
//     setEditedProduct((prev) => ({ ...prev, status: value as Product["status"] }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`/api/products/${product._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editedProduct),
//       });
//       if (response.ok) {
//         toast.success("Product updated successfully", {
//           duration: 4000,
//         });
//         setEditMode(false);
//       } else {
//         throw new Error("Failed to update product");
//       }
//     } catch (error) {
//       toast.error("Xảy ra lỗi khi cập nhận sản phẩm", {
//         duration: 4000,
//       });
//     }
//   };

//   const avatarImage = product.ProductImages.find((img) => img.is_avatar)?.img_url || "/placeholder.svg";

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="mb-6">
//         <Image src={avatarImage || "/placeholder.svg"} alt={product.name} width={400} height={400} className="rounded-lg" />
//       </div>
//       {editMode ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="name">Product Name</Label>
//             <Input id="name" name="name" value={editedProduct.name} onChange={handleChange} required />
//           </div>
//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Textarea id="description" name="description" value={editedProduct.description} onChange={handleChange} required />
//           </div>
//           <div>
//             <Label htmlFor="wholesale_price">Wholesale Price</Label>
//             <Input type="number" id="wholesale_price" name="wholesale_price" value={editedProduct.wholesale_price} onChange={handleChange} required />
//           </div>
//           <div>
//             <Label htmlFor="retail_price">Retail Price</Label>
//             <Input type="number" id="retail_price" name="retail_price" value={editedProduct.retail_price} onChange={handleChange} required />
//           </div>
//           <div>
//             <Label htmlFor="stock_quantity">Stock Quantity</Label>
//             <Input type="number" id="stock_quantity" name="stock_quantity" value={editedProduct.stock_quantity} onChange={handleChange} required />
//           </div>
//           <div>
//             <Label htmlFor="status">Status</Label>
//             <Select onValueChange={handleStatusChange} defaultValue={editedProduct.status}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Còn hàng">Còn hàng</SelectItem>
//                 <SelectItem value="Hết hàng">Hết hàng</SelectItem>
//                 <SelectItem value="Ngưng kinh doanh">Ngưng kinh doanh</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <Button type="submit">Save Changes</Button>
//           <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
//             Cancel
//           </Button>
//         </form>
//       ) : (
//         <div className="space-y-4">
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p>{product.description}</p>
//           <p>Wholesale Price: ${product.wholesale_price}</p>
//           <p>Retail Price: ${product.retail_price}</p>
//           <p>Stock Quantity: {product.stock_quantity}</p>
//           <p>Status: {product.status}</p>
//           <Button onClick={() => setEditMode(true)}>Edit Product</Button>
//         </div>
//       )}
//     </div>
//   );
// }
