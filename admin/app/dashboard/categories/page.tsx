import { PageHeader } from "@/components/page-header";

export default function CategoriesPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Danh mục sản phẩm" }];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
    </>
  );
}
