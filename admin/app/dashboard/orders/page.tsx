import { OrdersPage } from "@/components/orders/order-page";
import { PageHeader } from "@/components/page-header";

export default function CategoriesPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Đơn hàng" }];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <OrdersPage />
    </>
  );
}
