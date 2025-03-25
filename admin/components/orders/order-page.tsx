"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderDetailDialog } from "./order-detail-dialog";

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

  const handleUpdateStatus = (orderId: number, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order._id === orderId ? { ...order, OrderStatus: { ...order.OrderStatus, name: newStatus } } : order))
    );
  };

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {orders.map((order) => (
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

      <OrderDetailDialog order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};
