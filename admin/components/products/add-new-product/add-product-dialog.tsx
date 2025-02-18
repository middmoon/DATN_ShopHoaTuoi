// "use client";

// import type React from "react";
// import { useState, useEffect } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { MultiSelect } from "@/components/mutil-select";
// import { Plus } from "lucide-react";
// import { api } from "@/utils/api";
// import { toast } from "sonner";
// import { useQuery } from "@tanstack/react-query";

// // const categories = [
// //   { _id: 1, name: "flower", parent_id: null },
// //   { _id: 2, name: "flower for lover", parent_id: 1 },
// //   { _id: 3, name: "gift", parent_id: 1 },
// // ];

// export function AddProductDialog() {
//   const [open, setOpen] = useState(false);

//   const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

//   const {
//     data: categories,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const res = await api.get("/product-categories");

//       return res.data.data;
//     },
//     staleTime: Infinity,
//   });

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const productName = formData.get("productName") as string;
//     const productPrice = Number(formData.get("productPrice")) as number;

//     const newProduct = {
//       name: productName,
//       price: productPrice,
//       categories: selectedCategories,
//     };

//     try {
//       const res = await api.post("/product", newProduct);

//       if (res.status === 201) {
//         toast.message("Sản phẩm đã được thêm thành công", {
//           duration: 4000,
//           action: {
//             label: "Xem sản phẩm",
//             onClick: () => console.log("Xem sản phẩm"),
//           },
//         });
//       }

//       setOpen(false);
//     } catch (error) {
//       toast.error("Có lỗi xảy ra khi thêm sản phẩm, vui lòng thử lại!", {
//         duration: 4000,
//       });
//     }

//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="mb-5">
//           <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Thêm sản phẩm mới</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label htmlFor="productName">Tên sản phẩm</Label>
//             <Input id="productName" name="productName" required={true} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="productPrice">Giá</Label>
//             <Input type="number" id="productPrice" name="productPrice" required={true} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="categories">Danh mục sản phẩm</Label>
//             <MultiSelect
//               options={categories}
//               onValueChange={setSelectedCategories}
//               defaultValue={selectedCategories}
//               placeholder="Chọn danh mục sản phẩm"
//               variant="inverted"
//               animation={2}
//               maxCount={100}
//             />
//           </div>
//           <Button type="submit" className="mt-4">
//             Add Product
//           </Button>
//         </form>

//         <DialogDescription></DialogDescription>
//       </DialogContent>
//     </Dialog>
//   );
// }

// // "use client";

// // import { useState } from "react";
// // import { Plus } from "lucide-react";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { Label } from "@/components/ui/label";
// // import { Input } from "@/components/ui/input";
// // import type { Category, Product } from "@/app/dashboard/products/page";
// // import { CategorySelect } from "./category-select";

// // interface AddProductDialogProps {
// //   isOpen: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   onAddProduct: (product: Omit<Product, "id">) => void;
// // }

// // export function AddProductDialog({ isOpen, onOpenChange, onAddProduct }: AddProductDialogProps) {
// //   const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

// //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();
// //     const formData = new FormData(event.currentTarget);
// //     const newProduct = {
// //       name: formData.get("name") as string,
// //       price: Number(formData.get("price")),
// //       quantity: Number(formData.get("quantity")),
// //       categories: selectedCategories,
// //     };

// //     onAddProduct(newProduct);
// //     setSelectedCategories([]); // Reset selected categories
// //   };

// //   return (
// //     <Dialog open={isOpen} onOpenChange={onOpenChange}>
// //       <DialogContent className="sm:max-w-[425px]">
// //         <DialogHeader>
// //           <DialogTitle>Thêm sản phẩm mới</DialogTitle>
// //         </DialogHeader>
// //         <form onSubmit={handleSubmit} className="grid gap-4 py-4">
// //           <div className="grid gap-2">
// //             <Label htmlFor="name">Tên sản phẩm</Label>
// //             <Input id="name" name="name" placeholder="Tên sản phẩm" required />
// //           </div>
// //           <div className="grid gap-2">
// //             <Label htmlFor="price">Giá</Label>
// //             <Input id="price" name="price" type="number" placeholder="Giá" required />
// //           </div>
// //           <div className="grid gap-2">
// //             <Label htmlFor="quantity">Số lượng tồn kho</Label>
// //             <Input id="quantity" name="quantity" type="number" placeholder="Số lượng tồn kho" required />
// //           </div>
// //           <div className="grid gap-2">
// //             <Label htmlFor="categories">Danh mục</Label>
// //             <CategorySelect selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
// //           </div>
// //           <Button type="submit">
// //             <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
// //           </Button>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }
