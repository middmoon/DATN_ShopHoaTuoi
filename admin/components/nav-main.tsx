"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  pendingOrdersCount,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  pendingOrdersCount: number;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-md b">Quản lý cửa hàng</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span>
                    {item.title}
                    {/* Chỉ hiển thị số đơn hàng ở mục Đơn hàng */}
                    {item.title === "Đơn hàng" && pendingOrdersCount > 0 ? (
                      <span className="ml-2 rounded bg-gray-200 px-2 py-1 text-xs">{pendingOrdersCount}</span>
                    ) : null}
                  </span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>
                                {subItem.title}
                                {/* Chỉ hiển thị số đơn hàng đang chờ xử lý ở mục con */}
                                {subItem.title === "Chờ xác nhận" && pendingOrdersCount > 0 ? (
                                  <span className="ml-2 rounded bg-gray-200 px-2 py-1 text-xs">{pendingOrdersCount}</span>
                                ) : null}
                              </span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
