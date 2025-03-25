import { PageHeader } from "@/components/page-header";
import { DynamicForm } from "@/components/products/add-new-product/dynamic-form";
import DashboardCharts from "@/components/test/chart.test";
import { SearchLogChart, AuditLogChart } from "@/components/test/logchart.test";

export default function Page() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/" }];

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>

      {/* <DynamicForm /> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <DashboardCharts />

        {/* <SearchLogChart /> */}
        {/* <AuditLogChart /> */}
      </div>
    </>
  );
}
