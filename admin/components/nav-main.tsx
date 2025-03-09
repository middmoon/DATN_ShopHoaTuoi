"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-md b">Quản lý cửa hàng</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title} onClick={() => router.push(item.url)}>
                <button className="flex items-center gap-2 w-full text-left">
                  <item.icon />
                  <span>
                    {item.title}
                    {item.title === "Đơn hàng" && pendingOrdersCount > 0 ? (
                      <span className="ml-2 rounded bg-gray-200 px-2 py-1 text-xs">{pendingOrdersCount}</span>
                    ) : null}
                  </span>
                </button>
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
                          <SidebarMenuSubButton asChild onClick={() => router.push(subItem.url)}>
                            <button className="w-full text-left">
                              <span>
                                {subItem.title}
                                {subItem.title === "Chờ xác nhận" && pendingOrdersCount > 0 ? (
                                  <span className="ml-2 rounded bg-gray-200 px-2 py-1 text-xs">{pendingOrdersCount}</span>
                                ) : null}
                              </span>
                            </button>
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
