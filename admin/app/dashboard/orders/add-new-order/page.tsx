import { NewOrderForm } from "@/components/orders/add-order-form";
import { PageHeader } from "@/components/page-header";

export default function CategoriesPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Đơn hàng", href: "/dashboard/orders" },
    { label: "Thêm đơn hàng trực tiếp" },
  ];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6">Thêm đơn cửa hàng</h1>
        <NewOrderForm />
      </div>
    </>
  );
}
