import { PageHeader } from "@/components/page-header";
import SearchAnalyticsCharts from "@/components/chart/search-logs-charts";

export default function CategoriesPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Hoạt động kinh doanh", href: "/dashboard/business" },
    { label: "Xu hướng tìm kiếm" },
  ];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <SearchAnalyticsCharts />
    </>
  );
}
