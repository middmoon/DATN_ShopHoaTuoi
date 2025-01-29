import { PageHeader } from "@/components/page-header";

export default function ProductCategoryPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sản phẩm", href: "/dashboard/products" },
    { label: "Danh mục sản phẩm" },
  ];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <p>Danh mục sản phẩm</p>
    </>
  );
}
