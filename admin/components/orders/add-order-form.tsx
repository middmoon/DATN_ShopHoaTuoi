"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Define the form values type
interface FormValues {
  type: "Đơn online" | "Đơn cửa hàng" | "Đơn bán sĩ";
  total_price: number;
  note?: string;
  status: "Chờ xác nhận" | "Đang xử lý" | "Hoàn thành" | "Đơn bị hủy" | "Đang giao hàng";
  delivery_day?: Date;
  delivery_address: string;
  customer_id?: number;
  customer_name: string;
  customer_phone: string;
  ward_code?: string;
  district_code?: string;
  province_code?: string;
  products: {
    product_id: number;
    quantity: number;
    price: number;
  }[];
}

// Mock data for dropdowns - replace with actual API calls
const mockProvinces = [
  { code: "01", name: "Hà Nội" },
  { code: "02", name: "Hồ Chí Minh" },
  { code: "03", name: "Đà Nẵng" },
];

const mockDistricts = [
  { code: "001", name: "Quận Ba Đình", province_code: "01" },
  { code: "002", name: "Quận Hoàn Kiếm", province_code: "01" },
  { code: "003", name: "Quận 1", province_code: "02" },
  { code: "004", name: "Quận 2", province_code: "02" },
  { code: "005", name: "Quận Hải Châu", province_code: "03" },
];

const mockWards = [
  { code: "00001", name: "Phường Phúc Xá", district_code: "001" },
  { code: "00002", name: "Phường Trúc Bạch", district_code: "001" },
  { code: "00003", name: "Phường Hàng Bạc", district_code: "002" },
  { code: "00004", name: "Phường Bến Nghé", district_code: "003" },
  { code: "00005", name: "Phường Thảo Điền", district_code: "004" },
  { code: "00006", name: "Phường Thanh Bình", district_code: "005" },
];

const mockProducts = [
  { id: 1, name: "Product 1", price: 100000 },
  { id: 2, name: "Product 2", price: 200000 },
  { id: 3, name: "Product 3", price: 300000 },
  { id: 4, name: "Product 4", price: 400000 },
];

const mockCustomers = [
  { id: 1, name: "Nguyễn Văn A", phone: "0123456789" },
  { id: 2, name: "Trần Thị B", phone: "0987654321" },
  { id: 3, name: "Lê Văn C", phone: "0369852147" },
];

const ShopAddress = {};

export function NewOrderForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredDistricts, setFilteredDistricts] = useState(mockDistricts);
  const [filteredWards, setFilteredWards] = useState(mockWards);

  const form = useForm<FormValues>({
    defaultValues: {
      type: "Đơn online",
      total_price: 0,
      note: "",
      status: "Chờ xác nhận",
      delivery_address: "",
      customer_name: "",
      customer_phone: "",
      products: [{ product_id: 0, quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "products",
    control: form.control,
  });

  // Handle province change
  const handleProvinceChange = (provinceCode: string) => {
    form.setValue("province_code", provinceCode);
    form.setValue("district_code", undefined);
    form.setValue("ward_code", undefined);

    const districts = mockDistricts.filter((district) => district.province_code === provinceCode);
    setFilteredDistricts(districts);
    setFilteredWards([]);
  };

  // Handle district change
  const handleDistrictChange = (districtCode: string) => {
    form.setValue("district_code", districtCode);
    form.setValue("ward_code", undefined);

    const wards = mockWards.filter((ward) => ward.district_code === districtCode);
    setFilteredWards(wards);
  };

  // Handle customer selection
  const handleCustomerSelect = (customerId: number) => {
    const customer = mockCustomers.find((c) => c.id === customerId);
    if (customer) {
      form.setValue("customer_id", customer.id);
      form.setValue("customer_name", customer.name);
      form.setValue("customer_phone", customer.phone);
    }
  };

  // Handle product selection
  const handleProductSelect = (index: number, productId: number) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (product) {
      form.setValue(`products.${index}.product_id`, product.id);
      form.setValue(`products.${index}.price`, product.price);

      // Recalculate total price
      calculateTotalPrice();
    }
  };

  // Calculate total price based on products
  const calculateTotalPrice = () => {
    const products = form.getValues("products");
    const total = products.reduce((sum, product) => sum + (product.price * product.quantity || 0), 0);
    form.setValue("total_price", total);
  };

  // Handle form submission
  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);

      // In a real application, you would call your API here
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call the server action to create the order
      // await createOrder(data);

      // Show success message and redirect
      alert("Order created successfully!");
      router.push("/orders");
      router.refresh();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại hóa đơn</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Đơn online">Đơn online</SelectItem>
                    <SelectItem value="Đơn cửa hàng">Đơn cửa hàng</SelectItem>
                    <SelectItem value="Đơn bán sĩ">Đơn bán sĩ</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Order Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái đơn hàng</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Chờ xác nhận">Chờ xác nhận</SelectItem>
                    <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                    <SelectItem value="Đang giao hàng">Đang giao hàng</SelectItem>
                    <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                    <SelectItem value="Đơn bị hủy">Đơn bị hủy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delivery Date */}
          <FormField
            control={form.control}
            name="delivery_day"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày giao nhận</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total Price */}
          <FormField
            control={form.control}
            name="total_price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Total Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} disabled />
                </FormControl>
                <FormDescription>Tự động cộng thêm khi có sản phẩm</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Selection */}
            {/* Customer Selection */}
            {/* Customer Selection */}
            {/* Customer Selection */}
            {/* Customer Selection */}
            {/* Customer Selection */}
            {/* Customer Selection */}
            {/* Customer Selection */}
            {/* Customer Selection */}
            {/* 
            <FormItem>
              <FormLabel>Select Existing Customer</FormLabel>
              <Select onValueChange={(value) => handleCustomerSelect(Number(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id.toString()}>
                      {customer.name} ({customer.phone})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Or fill in customer details below</FormDescription>
            </FormItem> */}

            {/* Customer Name */}
            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên khách hàng</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Customer Phone */}
            <FormField
              control={form.control}
              name="customer_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Địa chỉ giao nhận</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Province */}
            <FormField
              control={form.control}
              name="province_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh / Thành phố</FormLabel>
                  <Select onValueChange={(value) => handleProvinceChange(value)} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockProvinces.map((province) => (
                        <SelectItem key={province.code} value={province.code}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* District */}
            <FormField
              control={form.control}
              name="district_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Huyện / Thành phố</FormLabel>
                  <Select onValueChange={(value) => handleDistrictChange(value)} value={field.value} disabled={!form.getValues("province_code")}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredDistricts.map((district) => (
                        <SelectItem key={district.code} value={district.code}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ward */}
            <FormField
              control={form.control}
              name="ward_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xã / Phường</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!form.getValues("district_code")}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ward" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredWards.map((ward) => (
                        <SelectItem key={ward.code} value={ward.code}>
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Delivery Address */}
          <FormField
            control={form.control}
            name="delivery_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số nhà - Tên đường</FormLabel>
                <FormControl>
                  <Input placeholder="Street address, building, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Note */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú</FormLabel>
              <FormControl>
                <Textarea placeholder="Add any special instructions or notes for this order" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-muted/50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ product_id: 0, quantity: 1, price: 0 })}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {fields.map((field, index: number) => (
            <Card key={field.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Product Selection */}
                  <FormField
                    control={form.control}
                    name={`products.${index}.product_id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product</FormLabel>
                        <Select
                          onValueChange={(value) => handleProductSelect(index, Number(value))}
                          value={field.value ? field.value.toString() : ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockProducts.map((product) => (
                              <SelectItem key={product.id} value={product.id.toString()}>
                                {product.name} - {product.price.toLocaleString()} VND
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Quantity */}
                  <FormField
                    control={form.control}
                    name={`products.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              calculateTotalPrice();
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Price */}
                  <FormField
                    control={form.control}
                    name={`products.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                calculateTotalPrice();
                              }}
                            />
                          </FormControl>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                remove(index);
                                calculateTotalPrice();
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button type="submit" className="w-1/4" disabled={isSubmitting} variant={"create"}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Order...
            </>
          ) : (
            "Create Order"
          )}
        </Button>
      </form>
    </Form>
  );
}
