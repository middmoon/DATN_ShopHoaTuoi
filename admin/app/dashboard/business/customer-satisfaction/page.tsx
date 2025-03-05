import { PageHeader } from "@/components/page-header";

export default function CategoriesPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Hoạt động kinh doanh", href: "/dashboard/business" },
    { label: "Phản hồi khách hàng" },
  ];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
    </>
  );
}
