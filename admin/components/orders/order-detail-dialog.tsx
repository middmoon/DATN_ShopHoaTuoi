"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { api } from "@/utils/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// Use the same Order type from orders-page.tsx
type Order = any; // Replace with the actual Order type

export function OrderDetailDialog({
  order,
  onClose,
  onUpdateStatus,
}: {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: number, newStatus: string) => void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!order) return null;

  const handleStatusUpdate = async (newStatusId: number) => {
    try {
      setIsUpdating(true);
      // Replace with your actual API endpoint
      // await api.put(`/orders/${order._id}/status`, { status_id: newStatusId });

      // Map status ID to status name (you may need to adjust this based on your status mapping)
      const statusMap: Record<number, string> = {
        1: "Chờ xác nhận",
        2: "Đang xử lý",
        3: "Hoàn thành",
        4: "Đơn bị hủy",
      };

      alert("Đơn hàng đã được thay đổi thành " + statusMap[newStatusId]);

      onUpdateStatus(order._id, statusMap[newStatusId]);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Chi tiết đơn hàng #{order._id}</span>
            <Badge
              variant={
                order.OrderStatus?.name === "Chờ xác nhận"
                  ? "outline"
                  : order.OrderStatus?.name === "Đang xử lý"
                  ? "secondary"
                  : order.OrderStatus?.name === "Hoàn thành"
                  ? "default"
                  : order.OrderStatus?.name === "Đang giao hàng"
                  ? "secondary"
                  : "destructive"
              }
            >
              {order.OrderStatus.name}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Thông tin khách hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Tên khách hàng</p>
                <p>{order.customer_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số điện thoại</p>
                <p>{order.customer_phone}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Thông tin giao hàng</h3>
            <div>
              <p className="text-sm text-muted-foreground">Địa chỉ giao hàng</p>
              <p>{order.delivery_address}</p>
            </div>
            {order.delivery_day && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">Ngày giao hàng</p>
                <p>{new Date(order.delivery_day).toLocaleDateString("vi-VN")}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Thông tin thanh toán</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Phương thức thanh toán</p>
                <p>{order.payment.PaymentMethod.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trạng thái thanh toán</p>
                <p>{order.payment.status}</p>
              </div>
            </div>

            {order.payment.PaymentHistories.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-1">Lịch sử thanh toán</p>
                <div className="space-y-1">
                  {order.payment.PaymentHistories.map((history: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{history.status}</span>
                      <span>{new Date(history.createdAt).toLocaleString("vi-VN")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Sản phẩm</h3>
            <div className="space-y-2">
              {order.Products.map((product: any) => (
                <div key={product._id} className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.retail_price.toLocaleString()} VND x {product.OrderProduct.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">{(product.retail_price * product.OrderProduct.quantity).toLocaleString()} VND</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 font-bold">
              <span>Tổng cộng:</span>
              <span>{order.total_price.toLocaleString()} VND</span>
            </div>
          </div>

          {order.note && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Ghi chú</h3>
                <p>{order.note}</p>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-6">
          {order.OrderStatus?.name === "Chờ xác nhận" && (
            <>
              <Button variant="default" onClick={() => handleStatusUpdate(2)} disabled={isUpdating}>
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Xác nhận đơn hàng
              </Button>
              <Button variant="destructive" onClick={() => handleStatusUpdate(5)} disabled={isUpdating}>
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Hủy đơn hàng
              </Button>
            </>
          )}

          {order.OrderStatus?.name === "Đang xử lý" && (
            <>
              <Button variant="default" onClick={() => handleStatusUpdate(3)} disabled={isUpdating}>
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Chuyển sang giao hàng
              </Button>
              <Button variant="destructive" onClick={() => handleStatusUpdate(5)} disabled={isUpdating}>
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Hủy đơn hàng
              </Button>
            </>
          )}

          {order.OrderStatus?.name === "Đang giao hàng" && (
            <>
              <Button variant="default" onClick={() => handleStatusUpdate(4)} disabled={isUpdating}>
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Giao hàng thành công
              </Button>
              <Button variant="secondary" onClick={() => handleStatusUpdate(6)} disabled={isUpdating}>
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Khách hoàn trả
              </Button>
            </>
          )}

          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
