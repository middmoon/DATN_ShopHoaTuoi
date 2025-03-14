"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/utils/api";

export default function ProductList() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<any>("/product/manage");
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

  const viewDetails = async (slug: string) => {
    router.push(`/dashboard/products/${slug}`);
  };

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
              <CardTitle className="pt-2 flex justify-between gap-2">
                <div className="flex flex-col">
                  <span>{product.name}</span>
                  <span className={`${product.is_public ? "text-[hsl(var(--create))]" : "text-[hsl(var(--update))]"} pt-2`}>
                    {product.is_public ? "Sẩn phẩm công khai" : "Sản phẩm không công khai"}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-sm text-gray-500 mb-2">Đã bán được: </p>
              <p className="font-semibold text-lg text-red-500">Giá bán: {product.retail_price.toLocaleString()} VND</p>

              <Link href={`/dashboard/products/${product.slug}`}>
                <Button variant="actions" className="mt-2 w-full" onClick={() => viewDetails(product.slug)}>
                  Xem chi tiết
                </Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
