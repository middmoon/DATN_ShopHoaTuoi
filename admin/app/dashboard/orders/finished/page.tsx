import { notFound } from "next/navigation";
import { api } from "@/utils/api";
import { PageHeader } from "@/components/page-header";

// export async function getOrderDetail(params: string) {
//   const res = await api.get(`/order/${params}`);

//   console.log(`param :::::::::::::: ${params}`);

//   if (res.status === 404) {
//     return notFound(); // 404 page
//   }

//   return res.data.data;
// }

export default async function finishedOrdersPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Đơn hàng", href: "/dashboard/orders" },
    { label: `Đơn hàng đã hoàn thành` },
  ];

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto p-10">
        <p>finished</p>
      </div>
    </>
  );
}
