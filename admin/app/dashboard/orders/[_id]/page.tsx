import { notFound } from "next/navigation";
import { api } from "@/utils/api";
import { PageHeader } from "@/components/page-header";

export async function getOrderDetail(params: string) {
  const res = await api.get(`/order/${params}`);
  if (res.status === 404) {
    return notFound(); // 404 page
  }

  return res.data.data;
}

export default async function OrderDetailByIdPage({ params }: { params: { _id: string } }) {
  const order = await getOrderDetail(params._id);

  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Đơn hàng", href: "/dashboard/orders" }, { label: `${order._id}` }];

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto p-10">
        <pre>{JSON.stringify(order, null, 2)}</pre>
      </div>
    </>
  );
}
