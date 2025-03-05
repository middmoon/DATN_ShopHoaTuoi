import { PageHeader } from "@/components/page-header";
import { DynamicForm } from "@/components/products/add-new-product/dynamic-form";
import { ChartTestComponent } from "@/components/test/chart.test";

export default function Page() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/" }];

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>

      {/* <DynamicForm /> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <ChartTestComponent />
      </div>
    </>
  );
}
