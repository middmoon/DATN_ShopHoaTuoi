import { PageHeader } from "@/components/page-header";
import AddProductForm from "@/components/products/add-new-product/add-product-form";

export default function AddProductPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sản phẩm", href: "/dashboard/products" },
    { label: "Thêm sản phẩm mới" },
  ];

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6">Thêm sản phẩm mới</h1>
        <AddProductForm />
      </div>
    </>
  );
}
