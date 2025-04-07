"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { Plus, Edit, Eye, Calendar, Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";

interface Event {
  _id: number;
  name: string;
  slug: string;
  discription: string;
  start_date: string;
  end_date: string;
  discount_type: "fixed" | "percentage";
  discount_value: number;
  is_active: boolean;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const router = useRouter();
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Danh sách sự kiện" }];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // In a real app, replace with your actual API endpoint
      const response = await api.get("/event");
      const data = response.data.data;

      if (response.status === 200) {
        setEvents(data);
      } else {
        toast.error("Không thể tải danh sách sự kiện");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Đã xảy ra lỗi khi tải danh sách sự kiện");
    } finally {
      setLoading(false);
    }
  };

  const toggleEventStatus = async (eventId: number, currentStatus: boolean) => {
    try {
      setActionLoading(eventId);

      // In a real app, replace with your actual API endpoint
      const response = await api.patch(`/event/${eventId}/status`, { is_active: !currentStatus });

      if (response.status === 200) {
        setEvents(events.map((event) => (event._id === eventId ? { ...event, is_active: !currentStatus } : event)));
        toast.success(`Sự kiện đã được ${!currentStatus ? "kích hoạt" : "vô hiệu hóa"}`);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.warning("Đang có một sự kiện đang hoạt động, vui lòng tắt trước khi thực hiện cập nhật.");
      } else {
        console.error("Error toggling event status:", error);
        toast.error("Đã xảy ra lỗi khi cập nhật trạng thái");
      }
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
  };

  const formatDiscount = (type: "fixed" | "percentage", value: number) => {
    if (type === "fixed") {
      return `${value.toLocaleString("vi-VN")} VNĐ`;
    } else {
      return `${value}%`;
    }
  };

  const isEventActive = (event: Event) => {
    const now = new Date();
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);

    return event.is_active && now >= startDate && now <= endDate;
  };

  const getEventStatus = (event: Event) => {
    const now = new Date();
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);

    if (!event.is_active) return "inactive";
    if (now < startDate) return "upcoming";
    if (now > endDate) return "expired";
    return "active";
  };

  const getStatusBadge = (event: Event) => {
    const status = getEventStatus(event);

    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Đang diễn ra</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500">Sắp diễn ra</Badge>;
      case "expired":
        return <Badge className="bg-gray-500">Đã kết thúc</Badge>;
      case "inactive":
        return (
          <Badge variant="outline" className="text-gray-500">
            Không hoạt động
          </Badge>
        );
    }
  };

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto pb-0 pt-5 px-10">
        <h1 className="text-2xl font-bold mb-5">Quản lý sự kiện</h1>

        <Link href="/dashboard/events/add-new-event">
          <Button className="mb-5" variant="create">
            <Plus className="mr-2 h-4 w-4" /> Tạo sự kiện mới
          </Button>
        </Link>
      </div>

      <div className="container mx-auto pb-10 pt-5 px-4 md:px-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event._id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={event.thumbnail || "/placeholder.svg?height=200&width=400"} alt={event.name} fill className="object-cover" />
                  {getStatusBadge(event)}
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{event.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>
                        {formatDate(event.start_date)} - {formatDate(event.end_date)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Tag className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Giảm giá: {formatDiscount(event.discount_type, event.discount_value)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      {actionLoading === event._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Switch
                          checked={event.is_active}
                          onCheckedChange={() => toggleEventStatus(event._id, event.is_active)}
                          className="data-[state=checked]:bg-green-500"
                        />
                      )}
                      <span className="text-sm">{event.is_active ? "Đang kích hoạt" : "Đã tắt"}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/dashboard/events/${event.slug}`}>
                        <Button variant="outline" size="icon" title="Xem chi tiết">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/events/edit/${event.slug}`}>
                        <Button variant="outline" size="icon" title="Chỉnh sửa">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
