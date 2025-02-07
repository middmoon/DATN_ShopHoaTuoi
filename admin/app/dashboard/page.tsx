import { PageHeader } from "@/components/page-header";

export default function Page() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/" }];

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
    </>
  );
}
