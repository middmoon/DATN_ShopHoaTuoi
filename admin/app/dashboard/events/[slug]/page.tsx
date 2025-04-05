"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { ArrowLeft, Calendar, Tag, Clock, Edit, Trash2, ShoppingBag, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/utils/api";

interface Product {
  _id: number;
  name: string;
  retail_price: number;
  sale_price: number;
}

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
  Products: Product[];
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const slug = params.slug as string;

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sự kiện", href: "/dashboard/events" },
    { label: event?.name || "Chi tiết sự kiện" },
  ];

  useEffect(() => {
    fetchEventDetails();
  }, [slug]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/event/${slug}`);
      const data = response.data.data;

      if (response.status === 200) {
        setEvent(data);
      } else {
        toast.error("Không thể tải thông tin sự kiện");
        router.push("/dashboard/events");
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("Đã xảy ra lỗi khi tải thông tin sự kiện");
      router.push("/dashboard/events");
    } finally {
      setLoading(false);
    }
  };

  const toggleEventStatus = async () => {
    if (!event) return;

    try {
      setActionLoading(true);
      const response = await api.patch(`/event/${event._id}/status`, {
        is_active: !event.is_active,
      });

      if (response.status === 200) {
        setEvent({ ...event, is_active: !event.is_active });

        toast.success(`Sự kiện đã được ${!event.is_active ? "kích hoạt" : "vô hiệu hóa"}`);
      } else {
        toast.error("Không thể cập nhật trạng thái sự kiện");
      }
    } catch (error) {
      console.error("Error toggling event status:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật trạng thái");
    } finally {
      setActionLoading(false);
    }
  };

  //   const deleteEvent = async () => {
  //     if (!event) return;

  //     try {
  //       setActionLoading(true);

  //       // In a real app, replace with your actual API endpoint
  //       const response = await fetch(`/api/v1/event/${event._id}`, {
  //         method: "DELETE",
  //       });

  //       if (response.ok) {
  //         toast.success("Sự kiện đã được xóa thành công");
  //         router.push("/dashboard/events");
  //       } else {
  //         toast.error("Không thể xóa sự kiện");
  //       }
  //     } catch (error) {
  //       console.error("Error deleting event:", error);
  //       toast.error("Đã xảy ra lỗi khi xóa sự kiện");
  //     } finally {
  //       setActionLoading(false);
  //     }
  //   };

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

  const calculateDiscountedPrice = (price: number, type: "fixed" | "percentage", value: number) => {
    if (type === "fixed") {
      return Math.max(0, price - value);
    } else {
      return price * (1 - value / 100);
    }
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

  if (loading) {
    return (
      <>
        <PageHeader items={breadcrumbItems}></PageHeader>
        <div className="container mx-auto pb-10 pt-5 px-4 md:px-10">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <PageHeader items={breadcrumbItems}></PageHeader>
        <div className="container mx-auto pb-10 pt-5 px-4 md:px-10">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Không tìm thấy sự kiện</h2>
            <p className="mb-4">Sự kiện bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link href="/dashboard/events">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại danh sách sự kiện
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>

      <div className="container mx-auto pb-10 pt-5 px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/dashboard/events">
              <Button variant="outline" size="icon" className="mr-4">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{event.name}</h1>
            <div className="ml-4">{getStatusBadge(event)}</div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href={`/dashboard/events/edit/${event.slug}`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Xóa sự kiện
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                  <AlertDialogDescription>Hành động này không thể hoàn tác. Sự kiện này sẽ bị xóa vĩnh viễn khỏi hệ thống.</AlertDialogDescription>
                </AlertDialogHeader>
                {/* <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteEvent} className="bg-red-500 hover:bg-red-600">
                    {actionLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                    Xóa
                  </AlertDialogAction>
                </AlertDialogFooter> */}
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin sự kiện</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 w-full mb-6 rounded-md overflow-hidden">
                  <Image src={event.thumbnail || "/placeholder.svg?height=300&width=600"} alt={event.name} fill className="object-cover" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Thời gian diễn ra</p>
                      <p className="font-medium">
                        {formatDate(event.start_date)} - {formatDate(event.end_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Tag className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Giảm giá</p>
                      <p className="font-medium">{formatDiscount(event.discount_type, event.discount_value)}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Ngày tạo</p>
                      <p className="font-medium">{formatDate(event.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Cập nhật lần cuối</p>
                      <p className="font-medium">{formatDate(event.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Mô tả</h3>
                  <p className="text-gray-700">{event.discription || "Không có mô tả"}</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Trạng thái:</span>
                    <span>
                      {event.is_active ? (
                        <Badge className="bg-green-500">Đang kích hoạt</Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">
                          Đã tắt
                        </Badge>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {actionLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Switch checked={event.is_active} onCheckedChange={toggleEventStatus} className="data-[state=checked]:bg-green-500" />
                    )}
                    <span className="text-sm">{event.is_active ? "Đang kích hoạt" : "Đã tắt"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Sản phẩm trong sự kiện
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.Products && event.Products.length > 0 ? (
                    event.Products.map((product) => (
                      <div key={product._id} className="flex flex-col p-3 border rounded-lg">
                        <span className="font-medium mb-1">{product.name}</span>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500 line-through mr-2">{product.retail_price.toLocaleString("vi-VN")} VNĐ</span>
                          <span className="font-medium text-green-600">
                            {calculateDiscountedPrice(product.retail_price, event.discount_type, event.discount_value).toLocaleString("vi-VN")} VNĐ
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Không có sản phẩm nào trong sự kiện này</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
