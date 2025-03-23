"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { CalendarIcon, Loader2, Plus, Trash2, Check, ChevronsUpDown, Search } from "lucide-react";
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";
import { api } from "@/utils/api";

// Define the form values type
interface FormValues {
  type: "Đơn online" | "Đơn cửa hàng" | "Đơn bán sĩ";
  total_price: number;
  note: string;
  status_id: string;
  delivery_day: Date;
  delivery_address: string;
  customer_id: number;
  customer_name: string;
  customer_phone: string;
  ward_code: string;
  district_code: string;
  province_code: string;
  products: {
    _id: number;
    quantity: number;
    retail_price: number;
  }[];
  payment_method_id: number;
}

interface Province {
  code: string;
  full_name: string;
}

interface District {
  code: string;
  full_name: string;
  province_code: string;
}

interface Ward {
  code: string;
  full_name: string;
  district_code: string;
}

// Define interface for product data
interface Product {
  _id: number;
  name: string;
  retail_price: number;
}

// Add this interface after the Product interface
interface Customer {
  id: number;
  name: string;
  phone: string;
}

// Update the searchUser function to match the provided signature
const searchUser = async (searchTerm: string): Promise<Customer[]> => {
  try {
    if (!searchTerm || searchTerm.trim() === "") {
      return mockCustomers; // Return mock customers if search term is empty
    }

    const response = await api.get(`/customer?q=${encodeURIComponent(searchTerm)}`);
    return response.data.data.customers;
  } catch (error) {
    console.error("Error searching customers:", error);
    return mockCustomers; // Fallback to mock customers on error
  }
};

const getProvinces = async () => {
  try {
    const response = await api.get("/address/procince");
    return response.data.data.province as Province[];
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};

const getDistricts = async (province_code: string) => {
  try {
    const response = await api.get(`/address/district/${province_code}`);
    return response.data.data.district as District[];
  } catch (error) {
    console.error("Error fetching districts:", error);
    return [];
  }
};

const getWards = async (district_code: string) => {
  try {
    const response = await api.get(`/address/ward/${district_code}`);
    return response.data.data.ward as Ward[];
  } catch (error) {
    console.error("Error fetching wards:", error);
    return [];
  }
};

const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    if (!searchTerm || searchTerm.trim() === "") {
      return []; // Return empty array if search term is empty
    }

    const response = await api.get(`/product/for-shop-order?q=${encodeURIComponent(searchTerm)}`);
    return response.data.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return []; // Fallback to empty array on error
  }
};

const mockProducts = [
  { id: 1, name: "Product 1", price: 100000 },
  { id: 2, name: "Product 2", phone: "0987654321" },
  { id: 3, name: "Lê Văn C", phone: "0369852147" },
];

const mockCustomers = [
  { id: 1, name: "Nguyễn Văn A", phone: "0123456789" },
  { id: 2, name: "Trần Thị B", phone: "0987654321" },
  { id: 3, name: "Lê Văn C", phone: "0369852147" },
];

// Store address details
const StoreAddress = {
  ward_code: "24772",
  ward_name: "Phường 8",
  district_code: "672",
  district_name: "Thành phố Đà Lạt",
  province_code: "68",
  province_name: "Tỉnh Lâm Đồng",
  address: "1 - Phù Đổng Thiên Vương",
};

const ShopAddress = {};

export function NewOrderForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);

  // Product search state
  const [productSearchResults, setProductSearchResults] = useState<Product[]>([]);
  const [openProductSearch, setOpenProductSearch] = useState<number | null>(null);
  const [isSearchingProducts, setIsSearchingProducts] = useState(false);

  // Add these state variables in the NewOrderForm component after the other state variables
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [customerSearchResults, setCustomerSearchResults] = useState<Customer[]>(mockCustomers);
  const [isSearchingCustomers, setIsSearchingCustomers] = useState(false);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);

  // Add this state variable after the other state variables
  const [selectedProducts, setSelectedProducts] = useState<Record<number, Product>>({});

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  const form = useForm<FormValues>({
    defaultValues: {
      type: "Đơn cửa hàng",
      total_price: 0,
      note: "",
      status_id: "4",
      delivery_address: "",
      customer_name: "",
      customer_phone: "",
      products: [{ _id: 0, quantity: 1, retail_price: 0 }],
      payment_method_id: 4,
    },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    name: "products",
    control: form.control,
  });

  const handleProvinceChange = async (province_code: string) => {
    form.setValue("province_code", province_code);
    form.setValue("district_code", ""); // Reset district when province changes
    form.setValue("ward_code", ""); // Reset ward when province changes
    setDistricts([]);
    setWards([]);

    if (province_code) {
      const data = await getDistricts(province_code);
      setDistricts(data);
    }

    setOpenProvince(false);
  };

  const handleDistrictChange = async (district_code: string) => {
    form.setValue("district_code", district_code);
    form.setValue("ward_code", ""); // Reset ward when district changes
    setWards([]);

    if (district_code) {
      const data = await getWards(district_code);
      setWards(data);
    }

    setOpenDistrict(false);
  };

  const handleWardChange = (ward_code: string) => {
    form.setValue("ward_code", ward_code);
    setOpenWard(false);
  };

  // Add this function after the handleDistrictChange function
  const handleUseStoreAddress = async () => {
    try {
      const { province_code, district_code, ward_code, address } = StoreAddress;

      form.setValue("province_code", province_code);

      const [districtsData, wardsData] = await Promise.all([getDistricts(province_code), getWards(district_code)]);

      setDistricts(districtsData);
      setWards(wardsData);

      form.setValue("district_code", district_code);
      form.setValue("ward_code", ward_code);
      form.setValue("delivery_address", address);
    } catch (error) {
      console.error("Error setting store address:", error);
      alert("Failed to set store address. Please try again.");
    }
  };

  // Update the handleCustomerSelect function
  const handleCustomerSelect = (customerId: number) => {
    const customer = mockCustomers.find((c) => c.id === customerId);
    if (customer) {
      form.setValue("customer_id", customer.id);
      form.setValue("customer_name", customer.name);
      form.setValue("customer_phone", customer.phone);
    }
  };

  // Updated handleProductSelect function to work with your API response structure
  const handleProductSelect = (index: number, productId: number) => {
    const product = productSearchResults.find((p) => p._id === productId);
    if (product) {
      // Store the selected product in state for display purposes
      setSelectedProducts((prev) => ({
        ...prev,
        [index]: product,
      }));

      // Update form values
      form.setValue(`products.${index}._id`, product._id);
      form.setValue(`products.${index}.retail_price`, product.retail_price);

      // Recalculate total price
      calculateTotalPrice();
    }

    setOpenProductSearch(null);
  };

  // Add this function after debouncedCustomerSearch
  const debouncedProductSearch = debounce(async (searchTerm: string) => {
    setIsSearchingProducts(true);
    const results = await searchProducts(searchTerm);
    setProductSearchResults(results);
    setIsSearchingProducts(false);
  }, 300);

  // Handle product search input change
  const handleProductSearch = (searchTerm: string) => {
    debouncedProductSearch(searchTerm);
  };

  // Calculate total price based on products
  const calculateTotalPrice = () => {
    const products = form.getValues("products");
    const total = products.reduce((sum, product) => sum + (product.retail_price * product.quantity || 0), 0);
    form.setValue("total_price", total);
  };

  // Handle form submission
  async function onSubmit(data: FormValues) {
    try {
      // Validate required fields
      if (!data.customer_name) {
        form.setError("customer_name", {
          type: "required",
          message: "Tên khách hàng là bắt buộc",
        });
        return;
      }

      if (!data.customer_phone) {
        form.setError("customer_phone", {
          type: "required",
          message: "Số điện thoại khách hàng là bắt buộc",
        });
        return;
      }

      if (!data.province_code) {
        form.setError("province_code", {
          type: "required",
          message: "Tỉnh/Thành phố là bắt buộc",
        });
        return;
      }

      if (!data.district_code) {
        form.setError("district_code", {
          type: "required",
          message: "Quận/Huyện là bắt buộc",
        });
        return;
      }

      if (!data.ward_code) {
        form.setError("ward_code", {
          type: "required",
          message: "Xã/Phường là bắt buộc",
        });
        return;
      }

      if (!data.delivery_address) {
        form.setError("delivery_address", {
          type: "required",
          message: "Địa chỉ giao nhận là bắt buộc",
        });
        return;
      }

      // Validate products
      const invalidProductIndex = data.products.findIndex((p) => !p._id || p._id === 0);
      if (invalidProductIndex >= 0) {
        form.setError(`products.${invalidProductIndex}._id`, {
          type: "required",
          message: "Sản phẩm là bắt buộc",
        });
        return;
      }

      setIsSubmitting(true);

      const formattedData = {
        ...data,
        status: Number(data.status_id),
        products: data.products.map((product) => ({
          ...product,
          quantity: Number(product.quantity),
        })),
      };

      console.log("Form data:", formattedData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await api.post("/test2", formattedData);

      if (response.status !== 201) {
        throw new Error("Failed to create order. Please try again.");
      }

      console.log("Data response:", response.data);

      // Show success message and redirect
      alert("Đơn hàng đã được tạo thành công!");
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
                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Loại hóa đơn</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Đơn cửa hàng">Đơn cửa hàng</SelectItem>
                    <SelectItem value="Đơn online">Đơn online</SelectItem>
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
            name="status_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Trạng thái đơn hàng</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Chờ xác nhận</SelectItem>
                    <SelectItem value="2">Đang xử lý</SelectItem>
                    <SelectItem value="3">Đang giao hàng</SelectItem>
                    <SelectItem value="4">Hoàn thành</SelectItem>
                    <SelectItem value="5">Đơn bị hủy</SelectItem>
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
                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Ngày giao nhận</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}>
                        {field.value ? format(field.value, "PPP", { locale: vi }) : <span>Chọn ngày giao nhận</span>}
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
                <FormLabel>Tổng đơn hàng</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} disabled required />
                </FormControl>
                <FormDescription>Tự động cộng thêm khi có sản phẩm</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>

          {/* <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>
            <Button type="button" variant="outline" onClick={searchUser}>
              Tìm kiếm khách hàng
              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Name */}
            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Tên khách hàng</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên khách hàng" {...field} required />
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
                  <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="Số điện thoại khách hàng" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="bg-muted/50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Địa chỉ giao nhận</h2>
            <Button type="button" variant="outline" onClick={handleUseStoreAddress}>
              Lấy địa chỉ cửa hàng
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Province - Searchable Combobox */}
            <FormField
              control={form.control}
              name="province_code"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Tỉnh / Thành phố</FormLabel>
                  <Popover open={openProvince} onOpenChange={setOpenProvince}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" aria-expanded={openProvince} className="w-full justify-between">
                          {field.value ? provinces.find((province) => province.code === field.value)?.full_name : "Chọn tỉnh"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Tìm tỉnh..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy tỉnh.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-y-auto">
                            {provinces.map((province) => (
                              <CommandItem key={province.code} value={province.full_name} onSelect={() => handleProvinceChange(province.code)}>
                                <Check className={cn("mr-2 h-4 w-4", field.value === province.code ? "opacity-100" : "opacity-0")} />
                                {province.full_name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* District - Searchable Combobox */}
            <FormField
              control={form.control}
              name="district_code"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Huyện / Thành phố</FormLabel>
                  <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openDistrict}
                          className="w-full justify-between"
                          disabled={!form.getValues("province_code")}
                        >
                          {field.value ? districts.find((district) => district.code === field.value)?.full_name : "Chọn huyện / thành phố"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Tìm huyện..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy huyện.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-y-auto">
                            {districts.map((district) => (
                              <CommandItem key={district.code} value={district.full_name} onSelect={() => handleDistrictChange(district.code)}>
                                <Check className={cn("mr-2 h-4 w-4", field.value === district.code ? "opacity-100" : "opacity-0")} />
                                {district.full_name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ward - Searchable Combobox */}
            <FormField
              control={form.control}
              name="ward_code"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Xã / Phường</FormLabel>
                  <Popover open={openWard} onOpenChange={setOpenWard}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openWard}
                          className="w-full justify-between"
                          disabled={!form.getValues("district_code")}
                        >
                          {field.value ? wards.find((ward) => ward.code === field.value)?.full_name : "Chọn xã phường / thị trấn"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Tìm xã phường..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy xã phường.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-y-auto">
                            {wards.map((ward) => (
                              <CommandItem key={ward.code} value={ward.full_name} onSelect={() => handleWardChange(ward.code)}>
                                <Check className={cn("mr-2 h-4 w-4", field.value === ward.code ? "opacity-100" : "opacity-0")} />
                                {ward.full_name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Số nhà - Tên đường</FormLabel>
                <FormControl>
                  <Input placeholder="Số nhà - tên đường" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Note */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold">Ghi chú</FormLabel>
                <FormControl>
                  <Textarea placeholder="Ghi chú đơn hàng....." className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Danh sách sản phẩm */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Danh sách mua sản phẩm</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ _id: 0, quantity: 1, retail_price: 0 })}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm sản phẩm
            </Button>
          </div>
          {fields.map((field, index: number) => (
            <Card key={field.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Product Selection - Searchable Combobox */}
                  <FormField
                    control={form.control}
                    name={`products.${index}._id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Sản phẩm</FormLabel>
                        <Popover open={openProductSearch === index} onOpenChange={(open) => setOpenProductSearch(open ? index : null)}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openProductSearch === index}
                                className="w-full justify-between"
                              >
                                {field.value && selectedProducts[index] ? selectedProducts[index].name : "Chọn sản phẩm"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <div className="flex items-center border-b px-3">
                                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                <CommandInput
                                  placeholder="Tìm sản phẩm..."
                                  onValueChange={handleProductSearch}
                                  className="flex-1 border-0 focus:ring-0"
                                />
                              </div>
                              <CommandList>
                                <CommandEmpty>
                                  {isSearchingProducts ? (
                                    <div className="flex items-center justify-center p-4">
                                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                      Đang tìm kiếm...
                                    </div>
                                  ) : (
                                    "Không tìm thấy sản phẩm."
                                  )}
                                </CommandEmpty>
                                <CommandGroup className="max-h-[300px] overflow-y-auto">
                                  {productSearchResults.map((product) => (
                                    <CommandItem key={product._id} value={product.name} onSelect={() => handleProductSelect(index, product._id)}>
                                      <Check className={cn("mr-2 h-4 w-4", field.value === product._id ? "opacity-100" : "opacity-0")} />
                                      <span className="flex-1">{product.name}</span>
                                      <span className="text-muted-foreground">{product.retail_price.toLocaleString()} VND</span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
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
                        <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Số lượng</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            value={field.value}
                            onChange={(e) => {
                              // Convert string value to number
                              const value = Number.parseInt(e.target.value, 10);
                              field.onChange(isNaN(value) ? 1 : value);
                              calculateTotalPrice();
                            }}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Price */}
                  <FormField
                    control={form.control}
                    name={`products.${index}.retail_price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá</FormLabel>
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
                              required
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
              Đang tạo đơn hàng...
            </>
          ) : (
            "Tạo đơn hàng"
          )}
        </Button>
      </form>
    </Form>
  );
}
