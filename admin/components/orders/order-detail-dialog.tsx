"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  status: string;
  delivery_day: string | null;
  delivery_address: string;
  createdAt: string;
  updatedAt: string;
  Products: OrderProduct[];
};

type OrderDetailDialogProps = {
  order: Order | null;
  onClose: () => void;
};

export const OrderDetailDialog = ({ order, onClose }: OrderDetailDialogProps) => {
  if (!order) return null;

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
      </DialogContent>
    </Dialog>
  );
};
