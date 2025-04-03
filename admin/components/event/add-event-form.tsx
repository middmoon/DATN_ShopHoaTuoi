"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, FormProvider, useWatch } from "react-hook-form";
import { CalendarIcon, Loader2, Plus, Trash2, Check, ChevronsUpDown, Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";
import ProductMultiSelect from "@/components/event/product-multi-select";
import { set } from "lodash";

function validDate(startDate: Date, endDate: Date) {
  return startDate <= endDate;
}

export function NewEventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<any>({
    mode: "onSubmit",
    defaultValues: {
      is_active: false,
      selected_products: [],
    },
  });

  const discountType = useWatch({
    control: form.control,
    name: "discount_type",
    defaultValue: "fixed",
  });

  const discountValue = useWatch({
    control: form.control,
    name: "discount_value",
    defaultValue: 0,
  });

  async function onSubmit(data: any) {
    try {
      setIsSubmitting(true);

      if (!data.selected_products || data.selected_products.length === 0) {
        toast.warning("Vui lòng chọn ít nhất một sản phẩm", { duration: 2000 });
        throw new Error("Chưa có ảnh");
      }

      if (!validDate(data.start_date, data.end_date)) {
        toast.warning("Ngày kết thúc phải sau ngày bắt đầu", { duration: 2000 });
        throw new Error("Ngày bắt đầu phải trước ngày kết thúc");
      }

      const formData = new FormData();
      data.discount_value = Number(data.discount_value);
      data.start_day = new Date(data.start_date);
      data.end_date = new Date(data.end_date);
      data.is_active = Boolean(data.is_active);

      formData.append("data", JSON.stringify(data));

      if (image) {
        formData.append("thumbnail", image);
      }

      const response = await api.post("/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to create event. Please try again.");
      }
      toast.success(`Sự kiện đã được tạo thành công! ${JSON.stringify(data)}`, { duration: 3000 });
      setIsSubmitting(false);
    } catch (error) {
      console.log("Form data:", data);
      alert(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-raw gap-5">
          <div className="flex flex-col gap-5">
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

            <div className="flex flex-row gap-2">
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
                  <FormItem className="flex flex-col">
                    <FormLabel>Ngày bắt đầu sự kiện</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
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
                  <FormItem className="flex flex-col">
                    <FormLabel>Ngày kết thúc sự kiện</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
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

            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="discount_type"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>Loại giảm giá</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={"fixed"}>
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
                    <Textarea placeholder="Mô tả sự kiện" className="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="thumbnail"
              rules={{ required: "Vui lòng chọn ảnh thumbnail" }}
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormItem>
                  <FormLabel>Ảnh Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      name={name}
                      ref={ref}
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          if (!file.type.startsWith("image/")) {
                            toast.warning("Chỉ chấp nhận tệp ảnh.", { duration: 2000 });
                            e.target.value = "";
                            onChange(null);
                            return;
                          }
                        }
                        onChange(files);
                      }}
                      onBlur={onBlur}
                    />
                  </FormControl>
                  <FormDescription>Ảnh đại diện cho sự kiện (PNG, JPG, JPEG, WEBP).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <div className="flex flex-col gap-5 w-full">
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
        <ImageUpload image={image} onImageChange={setImage} />

        <Button type="submit" className="w-1/4" disabled={isSubmitting} variant={"create"}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang tạo sự kiện mới
            </>
          ) : (
            "Tạo mới sự kiện"
          )}
        </Button>
      </form>
    </Form>
  );
}
