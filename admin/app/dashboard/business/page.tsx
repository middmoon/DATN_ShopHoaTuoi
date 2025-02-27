import { PageHeader } from "@/components/page-header";

export default function CategoriesPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Hoạt động kinh doanh" }];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
    </>
  );
}
