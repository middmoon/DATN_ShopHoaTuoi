"use client";

import { useState, useEffect } from "react";
import { Command, SquareTerminal, Box, Bitcoin, NotebookPen, CalendarDays } from "lucide-react";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { initSocket, requestOrderCount } from "@/lib/socket";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Đơn hàng",
      url: "/dashboard/orders",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Tất cả đơn hàng", url: "/dashboard/orders" },
        { title: "Chờ xác nhận", url: "/dashboard/orders/pending" },
        { title: "Đang xử lý", url: "/dashboard/orders/confirmed" },
        { title: "Đơn hoàn thành", url: "/dashboard/orders/finished" },
        { title: "Đơn bị hủy", url: "/dashboard/orders/canceled" },
      ],
    },
    {
      title: "Sản phẩm",
      url: "/dashboard/products",
      isActive: true,
      icon: Box,
      items: [
        { title: "Tất cả sản phẩm", url: "/dashboard/products" },
        { title: "Danh mục sản phẩm", url: "/dashboard/products/categories" },
      ],
    },
    {
      title: "Sự kiện",
      url: "/dashboard/events",
      isActive: true,
      icon: CalendarDays,
      items: [{ title: "Tất cả sự kiện", url: "/dashboard/events" }],
    },
    {
      title: "Hoạt động kinh doanh",
      url: "/dashboard/business",
      isActive: true,
      icon: Bitcoin,
      items: [
        { title: "Doanh thu", url: "/dashboard/business/income" },
        { title: "Phản hồi khách hàng", url: "/dashboard/business/customer-satisfaction" },
        { title: "Xu hướng tìm kiếm", url: "/dashboard/business/trends" },
      ],
    },
  ],
  projects: [
    {
      title: "Hệ thống",
      url: "/dashboard/system",
      isActive: true,
      icon: NotebookPen,
      items: [
        { title: "Logs hệ thống", url: "/dashboard/system/system-logs" },
        // { title: "Tìm kiếm người dùng", url: "/dashboard/system/system-logs" },
        // { title: "Lỗi hệ thống", url: "/dashboard/system/system-errors" },
      ],
    },
  ],
};

export function AppSidebar({ roles, ...props }: { roles: string[] }) {
  const [orderCount, setOrderCount] = useState<number | null>(null);

  useEffect(() => {
    const socket = initSocket();

    const handleOrderCount = (data: any) => {
      setOrderCount(data.pendingOrdersCount);
    };

    const handleOrderCountError = (error: any) => {
      console.error("Order count error:", error.message);
    };

    socket.on("orderCount", handleOrderCount);
    socket.on("orderCountError", handleOrderCountError);

    requestOrderCount();

    return () => {
      socket.off("orderCount", handleOrderCount);
      socket.off("orderCountError", handleOrderCountError);
    };
  }, []);

  const isOwner = roles.includes("owner");
  const isSysAdmin = roles.includes("sys_admin");

  return (
    <Sidebar variant="inset" {...props}>
      {/* Header: Icon và tên cửa hàng */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">PETACILIUS</span>
                  {/* Bạn có thể hiển thị thêm thông tin khác nếu cần */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content: hiển thị navigation với số đơn hàng pending */}
      <SidebarContent>
        {isOwner && <NavMain name={"Quản lý cửa hàng"} items={data.navMain} pendingOrdersCount={orderCount} />}
        {isSysAdmin && <NavMain name={"Quản lý hệ thống"} items={data.projects} pendingOrdersCount={0} />}
        {!isOwner && !isSysAdmin && <p className="text-center text-sm text-gray-500">Không có quyền truy cập</p>}
      </SidebarContent>

      {/* Footer: hiển thị thông tin user */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
