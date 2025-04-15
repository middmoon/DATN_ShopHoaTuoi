"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";
import ProductMultiSelect from "@/components/event/product-multi-select";
import { api } from "@/utils/api";

interface EventData {
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
  Products: any[];
}

export function EditEventForm({ eventData }: { eventData: EventData }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [currentThumbnail, setCurrentThumbnail] = useState(eventData.thumbnail);

  // Format dates for the form
  const formatDateForForm = (dateString: string) => {
    return new Date(dateString);
  };

  const form = useForm<any>({
    mode: "onSubmit",
    defaultValues: {
      name: eventData.name,
      discription: eventData.discription,
      start_date: formatDateForForm(eventData.start_date),
      end_date: formatDateForForm(eventData.end_date),
      discount_type: eventData.discount_type,
      discount_value: eventData.discount_value,
      is_active: eventData.is_active,
      selected_products: eventData.Products || [],
    },
  });

  const discountType = useWatch({
    control: form.control,
    name: "discount_type",
    defaultValue: eventData.discount_type,
  });

  const discountValue = useWatch({
    control: form.control,
    name: "discount_value",
    defaultValue: eventData.discount_value,
  });

  function validDate(startDate: Date, endDate: Date) {
    return startDate <= endDate;
  }

  async function onSubmit(data: any) {
    try {
      setIsSubmitting(true);

      if (!data.selected_products || data.selected_products.length === 0) {
        toast.warning("Vui lòng chọn ít nhất một sản phẩm", { duration: 2000 });
        throw new Error("Chưa chọn sản phẩm");
      }

      if (!validDate(data.start_date, data.end_date)) {
        toast.warning("Ngày kết thúc phải sau ngày bắt đầu", { duration: 2000 });
        throw new Error("Ngày bắt đầu phải trước ngày kết thúc");
      }

      const formData = new FormData();
      data.discount_value = Number(data.discount_value);
      data.start_date = new Date(data.start_date);
      data.end_date = new Date(data.end_date);
      data.is_active = Boolean(data.is_active);
      data._id = eventData._id;

      formData.append("data", JSON.stringify(data));

      if (image) {
        formData.append("thumbnail", image);
      }

      // In a real app, replace with your actual API endpoint
      const response = await api.put(`/event/${eventData._id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.status !== 200) {
        throw new Error("Failed to update event. Please try again.");
      }

      toast.success(`Sự kiện đã được cập nhật thành công!`, { duration: 3000 });
      router.push(`/dashboard/events/${eventData.slug}`);
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật sự kiện");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col gap-5 lg:w-1/2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sự kiện</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên sự kiện" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row gap-2">
              <FormField
                control={form.control}
                name="start_date"
                rules={{
                  required: "Vui lòng chọn ngày bắt đầu",
                  validate: (value) => {
                    const endDate = form.getValues("end_date");

                    if (value && endDate) {
                      const start = new Date(value);
                      const end = new Date(endDate);

                      if (start > end) {
                        toast.warning("Ngày kết thúc phải sau ngày bắt đầu", { duration: 3000 });
                        return "Ngày bắt đầu phải trước ngày kết thúc";
                      }
                    }

                    return true;
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>Ngày bắt đầu sự kiện</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày bắt đầu</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} locale={vi} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                rules={{
                  required: "Vui lòng chọn ngày kết thúc",
                  validate: (value) => {
                    const startDate = form.getValues("start_date");

                    if (value && startDate) {
                      const start = new Date(startDate);
                      const end = new Date(value);

                      if (end < start) {
                        return "Ngày kết thúc phải sau ngày bắt đầu";
                      }
                    }

                    return true;
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>Ngày kết thúc sự kiện</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày kết thúc</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} locale={vi} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <FormField
                control={form.control}
                name="discount_type"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>Loại giảm giá</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại giảm giá" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fixed">Cố định</SelectItem>
                        <SelectItem value="percentage">Phần trăm</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount_value"
                rules={{
                  required: "Vui lòng nhập giá trị giảm giá",
                  validate: (value) => {
                    const type = form.getValues("discount_type");
                    const number = Number(value);

                    if (isNaN(number)) return "Giá trị phải là số";

                    if (type === "percentage") {
                      if (number <= 0 || number > 100) return "Phần trăm phải trong khoảng 1 đến 100";
                    }

                    if (type === "fixed") {
                      if (number <= 0) return "Giá trị phải lớn hơn 0";
                    }

                    return true;
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>{form.watch("discount_type") === "percentage" ? "Phần trăm (%)" : "Giá trị cố định"}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập giá trị"
                        {...field}
                        min="1"
                        max={form.watch("discount_type") === "percentage" ? "100" : undefined}
                        onChange={(e) => {
                          let value = Number(e.target.value);
                          if (form.watch("discount_type") === "percentage" && value > 100) {
                            value = 100;
                          }
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <FormLabel>Kích hoạt sự kiện</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={cn("data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả sự kiện</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mô tả sự kiện" className="min-h-32" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 lg:w-1/2">
            <FormField
              control={form.control}
              name="selected_products"
              rules={{
                validate: (value) => {
                  if (!value || value.length === 0) {
                    return "Vui lòng chọn ít nhất một sản phẩm";
                  }
                  return true;
                },
              }}
              render={() => (
                <FormItem>
                  <FormProvider {...form}>
                    <ProductMultiSelect name="selected_products" discount_type={discountType} discount_value={discountValue} />
                  </FormProvider>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormLabel className="block mb-2">Ảnh Thumbnail</FormLabel>
          {currentThumbnail && !image && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Ảnh hiện tại:</p>
              <div className="relative w-full max-w-md h-48 rounded-md overflow-hidden">
                <img src={currentThumbnail || "/placeholder.svg"} alt="Current thumbnail" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <ImageUpload image={image} onImageChange={setImage} />
          {!image && <p className="text-sm text-gray-500 mt-2">Để trống nếu bạn muốn giữ ảnh hiện tại.</p>}
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="w-full md:w-1/4" disabled={isSubmitting} variant={"actions"}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang cập nhật
              </>
            ) : (
              "Cập nhật sự kiện"
            )}
          </Button>

          <Button type="button" variant="outline" className="w-full md:w-1/4" onClick={() => router.push(`/dashboard/events/${eventData.slug}`)}>
            Hủy
          </Button>
        </div>
      </form>
    </Form>
  );
}
