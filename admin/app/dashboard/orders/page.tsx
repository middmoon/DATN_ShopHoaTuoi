import { OrdersPage } from "@/components/orders/order-page";
import { PageHeader } from "@/components/page-header";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CategoriesPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Đơn hàng" }];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>

      <div className="container mx-auto pb-0 pt-5 px-10">
        <h1 className="text-2xl font-bold mb-5">Quản lý đơn hàng</h1>

        <Link href="/dashboard/orders/add-new-order">
          <Button className="mb-5" variant="create">
            <Plus className="mr-2 h-4 w-4" /> Thêm đơn hàng trực tiếp
          </Button>
        </Link>
      </div>

      <OrdersPage queryRoute={"/order"} />
    </>
  );
}
