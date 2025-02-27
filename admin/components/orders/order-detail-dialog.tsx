"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api"; // Đảm bảo bạn có file này để gọi API

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

type OrderDetailDialogProps = {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: number, newStatus: Order["status"]) => void;
};

export const OrderDetailDialog = ({ order, onClose, onUpdateStatus }: OrderDetailDialogProps) => {
  if (!order) return null;
  const [status, setStatus] = useState<Order["status"]>(order.status);
  const [loading, setLoading] = useState(false);

  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      await api.patch(`/order/${order._id}/status`, { status: "Đang xử lý" });
      setStatus("Đang xử lý");
      onUpdateStatus(order._id, "Đang xử lý");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi tiết Đơn hàng #{order._id}</DialogTitle>
        </DialogHeader>
        <p>
          <strong>Địa chỉ giao hàng:</strong> {order.delivery_address}
        </p>
        <p>
          <strong>Ghi chú:</strong> {order.note}
        </p>
        <p>
          <strong>Sản phẩm:</strong>
        </p>
        <ul>
          {order.Products.map((product) => (
            <li key={product._id}>
              {product.name} - {product.retail_price.toLocaleString()} VND x {product.OrderProduct.quantity}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <p>
            <strong>Trạng thái:</strong> {status}
          </p>
        </div>

        {/* Chỉ hiển thị nút xác nhận nếu trạng thái là "Chờ xác nhận" */}
        {status === "Chờ xác nhận" && (
          <Button variant="primary" onClick={handleConfirmOrder} disabled={loading} className="mt-4">
            {loading ? "Đang xác nhận..." : "Xác nhận đơn hàng"}
          </Button>
        )}

        <Button variant="outline" onClick={onClose} className="mt-4">
          Đóng
        </Button>
      </DialogContent>
    </Dialog>
  );
};
