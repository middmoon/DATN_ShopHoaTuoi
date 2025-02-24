import { PageHeader } from "@/components/page-header";
import { DynamicForm } from "@/components/products/add-new-product/dynamic-form";

export default function Page() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/" }];

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>

      <DynamicForm />
    </>
  );
}
