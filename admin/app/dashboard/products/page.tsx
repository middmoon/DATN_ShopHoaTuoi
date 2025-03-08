import { PageHeader } from "@/components/page-header";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductList from "@/components/products/product-list";
import { api } from "@/utils/api";

export default function ProductsPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Sản phẩm" }];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto pb-0 pt-5 px-10">
        <h1 className="text-2xl font-bold mb-5">Quản lý sản phẩm</h1>

        <Link href="/dashboard/products/add-new-product">
          <Button className="mb-5" variant="create">
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
