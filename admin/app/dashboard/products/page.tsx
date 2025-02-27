import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductList from "@/components/products/product-list";

type Product = {
  id: number;
  name: string;
  // description: string;
  price: number;
  quantity: number;
};

const products: Product[] = [
  { id: 1, name: "Product 1", price: 10, quantity: 100 },
  { id: 2, name: "Product 2", price: 20, quantity: 50 },
  { id: 3, name: "Product 3", price: 30, quantity: 75 },
];

export default function ProductsPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Sản phẩm" }];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto pb-0 pt-5 px-10">
        <h1 className="text-2xl font-bold mb-5">Quản lý sản phẩm</h1>

        <Link href="/dashboard/products/add-new-product">
          <Button className="mb-5">
            <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
          </Button>
        </Link>
      </div>

      <div className="container mx-auto pb-0 px-5">
        <ProductList />
      </div>
    </>
  );
}

// <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>Tên sản phẩm</TableHead>
//               <TableHead>Giá</TableHead>
//               <TableHead>Tồn kho</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>{product.id}</TableCell>
//                 <TableCell>
//                   <Label>{product.name}</Label>
//                 </TableCell>
//                 <TableCell>
//                   <Label>{product.price}</Label>
//                 </TableCell>
//                 <TableCell>
//                   <Label>{product.quantity}</Label>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
