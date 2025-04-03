"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderDetailDialog } from "./order-detail-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PaymentHistory = {
  status: string;
  createdAt: string;
};

type Payment = {
  _id: number;
  amount: number;
  status: string;
  info: Record<string, any>;
  PaymentMethod?: {
    name: string;
  };
  PaymentHistories: PaymentHistory[];
};

type OrderProduct = {
  _id: number;
  name: string;
  retail_price: number;
  OrderProduct: {
    quantity: number;
  };
};

type Order = {
  _id: number;
  type: string;
  total_price: number;
  note: string;
  status_id: number;
  delivery_day: string | null;
  delivery_address: string;
  customer_id: number | null;
  customer_name: string;
  customer_phone: string;
  ward_code: string;
  district_code: string;
  province_code: string;
  createdAt: string;
  updatedAt: string;
  Products: OrderProduct[];
  OrderStatus?: {
    name: string;
  };
  payment: Payment;
};

export const OrdersPage = ({ queryRoute }: { queryRoute: string }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State cho tiêu chí lọc
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Danh sách phương thức thanh toán
  const paymentMethods = [
    { _id: 1, name: "VNPay" },
    { _id: 2, name: "Momo" },
    { _id: 3, name: "ZaloPay" },
    { _id: 4, name: "Tiền mặt" },
    { _id: 5, name: "Thẻ tín dụng" },
    { _id: 6, name: "Chuyển khoản ngân hàng" },
    { _id: 7, name: "Thanh toán khi nhận hàng (COD)" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(queryRoute);
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [queryRoute]);

  // Hàm lọc đơn hàng
  const filteredOrders = orders.filter((order) => {
    // Lọc theo trạng thái
    const statusMatch = selectedStatus === "all" || order.OrderStatus?.name === selectedStatus;

    // Lọc theo phương thức thanh toán
    const paymentMethodMatch = selectedPaymentMethod === "all" || order.payment.PaymentMethod?.name === selectedPaymentMethod;

    // Lọc theo ngày cụ thể
    const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
    const dateMatch = !selectedDate || orderDate === selectedDate;

    return statusMatch && paymentMethodMatch && dateMatch;
  });

  const handleUpdateStatus = (orderId: number, newStatus: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  };

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {/* Phần lọc */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="status">Trạng thái</Label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Chờ xác nhận">Chờ xác nhận</SelectItem>
              <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
              <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
              <SelectItem value="Thất bại">Thất bại</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="paymentMethod">Phương thức thanh toán</Label>
          <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
            <SelectTrigger id="paymentMethod">
              <SelectValue placeholder="Chọn phương thức" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {paymentMethods.map((method) => (
                <SelectItem key={method._id} value={method.name}>
                  {method.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="selectedDate">Ngày tạo đơn</Label>
          <Input id="selectedDate" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>
      </div>

      {/* Danh sách đơn hàng đã lọc */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <Card key={order._id} onClick={() => setSelectedOrder(order)} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Đơn hàng #{order._id}</span>
                <div className="flex gap-2">
                  <span className="text-sm font-normal px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {order.OrderStatus?.name || "Chưa xác định"}
                  </span>
                  <span
                    className={`text-sm font-normal px-2 py-1 rounded-full ${
                      order.payment?.status === "Hoàn thành"
                        ? "bg-[hsl(var(--success)_/_0.1)] text-[hsl(var(--create))]"
                        : order.payment?.status === "Thất bại"
                        ? "bg-[hsl(var(--failure)_/_0.1)] text-[hsl(var(--failure))]"
                        : order.payment?.status === "Đang xử lý"
                        ? "bg-[hsl(var(--update)_/_0.1)] text-[hsl(var(--update))]"
                        : "bg-[hsl(var(--actions)_/_0.1)] text-[hsl(var(--actions))]"
                    }`}
                  >
                    {order.payment?.status === "Hoàn thành"
                      ? "Đã thanh toán"
                      : order.payment?.status === "Thất bại"
                      ? "Thanh toán lỗi"
                      : order.payment?.status === "Đang xử lý" || order.payment?.status === "Chờ xác nhận"
                      ? "Chờ thanh toán"
                      : order.payment?.status || "Chưa xác định"}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-lg font-semibold">{order.total_price.toLocaleString()} VND</p>

                <div className="text-sm text-muted-foreground">
                  <p>
                    <strong>Khách hàng:</strong> {order.customer_name}
                  </p>
                  <p>
                    <strong>SĐT:</strong> {order.customer_phone}
                  </p>
                  <p>
                    <strong>Thanh toán:</strong> {order.payment.PaymentMethod?.name || "Chưa xác định"} - {order.payment.status || "Chưa xác định"}
                  </p>
                  <p>
                    <strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(order);
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <OrderDetailDialog order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};
