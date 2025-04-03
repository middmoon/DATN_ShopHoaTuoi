import { NewEventForm } from "@/components/event/add-event-form";
import { PageHeader } from "@/components/page-header";

export default function CategoriesPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sự kiện", href: "/dashboard/orders" },
    { label: "Thêm mới sự kiện" },
  ];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6">Thêm sự kiện mới</h1>
        <NewEventForm />
      </div>
    </>
  );
}
