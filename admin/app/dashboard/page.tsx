import { PageHeader } from "@/components/page-header";
import NestedForm from "@/components/products/add-new-product/attribute-field";

export default function Page() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/" }];

  return (
    <>
      {/* <PageHeader items={breadcrumbItems}></PageHeader>
       */}

      <NestedForm />
    </>
  );
}
