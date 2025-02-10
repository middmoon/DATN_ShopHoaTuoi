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
          url: "#",
        },
        {
          title: "Đang chờ xử lý",
          url: "#",
        },
        {
          title: "Đơn hoàn thành",
          url: "#",
        },
      ],
    },
    {
      title: "Sản phẩm",
      url: "/dashboard/products",
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
    // {
    //   title: "Kho hàng",
    //   url: "/dashboard/inventory",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "Nguyên liệu tòn kho",
    //       url: "#",
    //     },
    //     {
    //       title: "Danh mục kho hàng",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Doanh thu",
      url: "/dashboard/income",
      icon: Bitcoin,
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Support",
  //     url: "#",
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: "Feedback",
  //     url: "#",
  //     icon: Send,
  //   },
  // ],
  projects: [
    {
      name: "Logs",
      url: "#",
      icon: NotebookPen,
    },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
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
        {isSysAdmin && <NavProjects projects={data.projects} />}
        {!isOwner && !isSysAdmin && <p className="text-center text-sm text-gray-500">Không có quyền truy cập</p>}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

//   {/* Content */}
//   <SidebarContent>
//   {/* Quản lý cửa hàng */}
//   <NavMain items={data.navMain} pendingOrdersCount={pendingOrdersCount} />
//   {/* Quản lý hệ thống */}
//   {/* <NavProjects projects={data.projects} /> */}

//   {/* Mở rộng */}
//   {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
// </SidebarContent>
