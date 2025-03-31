import { PageHeader } from "@/components/page-header";
import AuditLogCharts from "@/components/chart/autdit-logs-charts";

export default function CategoriesPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Hệ thống" }];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
    </>
  );
}
