"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderDetailDialog } from "./order-detail-dialog";

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
  total_price: number;
  note: string;
  status: "Chờ xác nhận" | "Đang xử lý" | "Hoàn thành" | "Đơn bị hủy";
  delivery_day: string | null;
  delivery_address: string;
  createdAt: string;
  updatedAt: string;
  Products: OrderProduct[];
};

export const OrdersPage = ({ queryRoute }: { queryRoute: string }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get<{ data: Order[] }>(queryRoute);
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = (orderId: number, newStatus: Order["status"]) => {
    setOrders((prevOrders) => prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order)));
  };

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {orders.map((order) => (
        <Card key={order._id} onClick={() => setSelectedOrder(order)} className="cursor-pointer">
          <CardHeader>
            <CardTitle>Đơn hàng #{order._id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Tổng giá:</strong> {order.total_price.toLocaleString()} VND
            </p>
            <p>
              <strong>Trạng thái:</strong> {order.status}
            </p>
            <p>
              <strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <Button asChild>Xem chi tiết</Button>
          </CardContent>
        </Card>
      ))}

      <OrderDetailDialog order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};
