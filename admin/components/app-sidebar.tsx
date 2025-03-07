"use client";

import * as React from "react";

import { BookOpen, Box, Command, Frame, SquareTerminal, NotebookPen, Bitcoin } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useGetPendingOrdersCount from "@/hooks/getPendingCountOrders";

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
        {
          title: "Tất cả đơn hàng",
          url: "/dashboard/orders",
        },
        {
          title: "Chờ xác nhận",
          url: "/dashboard/orders/pending",
        },
        {
          title: "Đang xử lý",
          url: "/dashboard/orders/confirmed",
        },
        {
          title: "Đơn hoàn thành",
          url: "/dashboard/orders/finished",
        },
        {
          title: "Đơn bị hủy",
          url: "/dashboard/orders/canceled",
        },
      ],
    },
    {
      title: "Sản phẩm",
      url: "/dashboard/products",
      isActive: true,
      icon: Box,
      items: [
        {
          title: "Tất cả sản phẩm",
          url: "/dashboard/products",
        },
        {
          title: "Danh mục sản phẩm",
          url: "/dashboard/products/categories",
        },
      ],
    },
    {
      title: "Hoạt động kinh doanh",
      url: "/dashboard/business",
      isActive: true,
      icon: Bitcoin,
      items: [
        {
          title: "Doanh thu",
          url: "/dashboard/business/income",
        },
        {
          title: "Phản hồi khách hàng",
          url: "/dashboard/business/customer-satisfaction",
        },
        {
          title: "Xu hướng tìm kiếm",
          url: "/dashboard/business/trends",
        },
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
        {
          title: "Logs hệ thống",
          url: "/dashboard/system/system-logs",
        },
        // {
        //   title: "Xu hướng tìm kiếm",
        //   url: "/dashboard/system/user-search",
        // },
        {
          title: "Lỗi hệ thống",
          url: "/dashboard/system/system-errors",
        },
      ],
    },
  ],
};

export function AppSidebar({ roles, ...props }: { roles: string[] }) {
  const { pendingOrdersCount, loading, error } = useGetPendingOrdersCount();

  const isOwner = roles.includes("owner");
  const isSysAdmin = roles.includes("sys_admin");

  return (
    <Sidebar variant="inset" {...props}>
      {/* Header Icon + Tên cửa hàng */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">PETACILIUS</span>
                  {/* <span className="truncate text-xs">Quản lý cửa hàng</span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {isOwner && <NavMain items={data.navMain} pendingOrdersCount={pendingOrdersCount} />}
        {isSysAdmin && <NavMain items={data.projects} pendingOrdersCount={0} />}
        {!isOwner && !isSysAdmin && <p className="text-center text-sm text-gray-500">Không có quyền truy cập</p>}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
