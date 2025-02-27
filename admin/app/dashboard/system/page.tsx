import { PageHeader } from "@/components/page-header";

export default function CategoriesPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Hệ thống" }];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
    </>
  );
}
