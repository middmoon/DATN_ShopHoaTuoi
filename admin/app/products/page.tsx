"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/page-header";

import axios from "axios";

type Product = {
  id: number;
  name: string;
  // description: string;
  price: number;
  quantity: number;
};

const initialProducts: Product[] = [
  { id: 1, name: "Product 1", price: 10, quantity: 100 },
  { id: 2, name: "Product 2", price: 20, quantity: 50 },
  { id: 3, name: "Product 3", price: 30, quantity: 75 },
];

export default function ProductsPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/" }, { label: "Products" }];
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProduct = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
    };

    try {
      const response = await axios.post("http://localhost:3000/api/v1/product", newProduct);

      console.log(response.data);

      toast({
        title: "Sản phẩm đã được thêm thành công",
        duration: 4000,
        variant: "success",
      });

      setIsAddDialogOpen(false);
      // Optionally, update the products list here
      // setProducts([...products, response.data]);
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra, vui lòng thử lại!",
        duration: 4000,
      });
    }
  };

  const handleUpdateProduct = (id: number, field: keyof Product, value: string | number) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, [field]: value } : product)));
  };

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Quản lý sản phẩm</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-5">
              <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Tên sản phẩm</Label>
                <input
                  id="name"
                  name="name"
                  className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Tên sản phẩm"
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Giá</Label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Giá"
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantity">Số lượng tồn kho</Label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Số lượng tồn kho"
                  required
                />
              </div>
              <Button type="submit">Thêm sản phẩm</Button>
            </form>
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Tồn kho</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <Label>{product.name}</Label>
                </TableCell>
                <TableCell>
                  <Label>{product.price}</Label>
                </TableCell>
                <TableCell>
                  <Label>{product.quantity}</Label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
