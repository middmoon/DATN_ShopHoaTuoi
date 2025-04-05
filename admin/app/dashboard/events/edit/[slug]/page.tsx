"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { EditEventForm } from "@/components/event/edit-event-form";
import { api } from "@/utils/api";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(null);
  const slug = params.slug as string;

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sự kiện", href: "/dashboard/events" },
    { label: "Chỉnh sửa sự kiện" },
  ];

  useEffect(() => {
    fetchEventDetails();
  }, [slug]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      // In a real app, replace with your actual API endpoint
      const response = await api.get(`/event/${slug}`);
      const data = response.data;

      if (response.status === 200) {
        setEventData(data.data);
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

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>

      <div className="container mx-auto pb-10 pt-5 px-4 md:px-10">
        <div className="flex items-center mb-6">
          <Link href={`/dashboard/events/${slug}`}>
            <Button variant="outline" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Chỉnh sửa sự kiện</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : eventData ? (
          <EditEventForm eventData={eventData} />
        ) : (
          <div className="text-center">
            <p className="mb-4">Không thể tải thông tin sự kiện. Vui lòng thử lại sau.</p>
            <Link href="/dashboard/events">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại danh sách sự kiện
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
