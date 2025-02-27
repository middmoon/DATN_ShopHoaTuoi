import { OrdersPage } from "@/components/orders/order-page";
import { PageHeader } from "@/components/page-header";

export default async function finishedOrdersPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Đơn hàng", href: "/dashboard/orders" },
    { label: `Đơn hàng chờ xác nhận` },
  ];

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <OrdersPage queryRoute={"/order/pending"} />
    </>
  );
}
