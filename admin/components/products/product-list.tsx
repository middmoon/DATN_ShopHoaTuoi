"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/utils/api";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<any>("/product");
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
        setError("Có lỗi xảy ra khi tải dữ liệu");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải sản phẩm...</p>;
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product: any) => {
        const avatarImage = product.ProductImages?.find((img: any) => img.is_avatar) || product.ProductImages?.[0];

        return (
          <Card key={product._id}>
            <CardHeader>
              <div className="w-full h-40 relative">
                <Image
                  src={avatarImage?.img_url || "/placeholder.jpg"}
                  alt={product.name}
                  layout="fill"
                  className="rounded-lg"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardTitle className="pt-2">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-sm text-gray-500 mb-2">Đã bán được: </p>
              <p className="font-semibold text-lg text-red-500">{product.retail_price.toLocaleString()} VND</p>
              <Button variant="actions" className="mt-2 w-full">
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
