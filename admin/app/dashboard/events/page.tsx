import { PageHeader } from "@/components/page-header";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CategoriesPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Danh sách sự kiện" }];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>

      <div className="container mx-auto pb-0 pt-5 px-10">
        <h1 className="text-2xl font-bold mb-5">Quản lý sự kiện</h1>

        <Link href="/dashboard/events/add-new-event">
          <Button className="mb-5" variant="create">
            <Plus className="mr-2 h-4 w-4" /> Thêm sự kiện mới
          </Button>
        </Link>
      </div>
    </>
  );
}
