"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { api } from "@/utils/api";

const fetchProducts = async () => {
  const response = await api.get("/product/manage/basic");

  if (response.status !== 200) {
    throw new Error("Failed to fetch products.");
  }

  return response.data.data;
};

export default function ProductMultiSelect({ name, discount_type, discount_value }: { name: string; discount_type: string; discount_value: string }) {
  const { setValue, getValues } = useFormContext();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  const selected = getValues(name) || [];
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const toggleProduct = (product: { _id: number; name: string }) => {
    const exists = selected.some((p: any) => p._id === product._id);
    const newSelected = exists ? selected.filter((p: any) => p._id !== product._id) : [...selected, product];
    setValue(name, newSelected, { shouldValidate: true });
  };

  const removeProduct = (id: number) => {
    const newSelected = selected.filter((p: any) => p._id !== id);
    setValue(name, newSelected, { shouldValidate: true });
  };

  const handleDiscount = (product_price: number, discount_type: string, discount_value: string) => {
    switch (discount_type) {
      case "fixed":
        return product_price - Number(discount_value);
      case "percentage":
        if (Number(discount_value) > 100) {
          discount_value = "100";
        }
        return product_price * (1 - Number(discount_value) / 100);
      default:
        return product_price;
    }
  };

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="space-y-4 w-full">
      <div className="space-y-1">
        <Label>Sản phẩm đã chọn ({selected.length})</Label>
        <div className="flex flex-wrap gap-2">
          {selected.map((p: any) => (
            <Badge key={p._id} variant="outline" className="flex items-center gap-1">
              {p.name} - {p.retail_price.toLocaleString("vi-VN")} -&gt;{" "}
              {handleDiscount(p.retail_price, discount_type, discount_value).toLocaleString("vi-VN")} VND
              <X className="w-3 h-3 cursor-pointer ml-1" onClick={() => removeProduct(p._id)} />
            </Badge>
          ))}
        </div>
      </div>

      <Card className="p-4 border w-full">
        <Label className="mb-2 block">Danh sách sản phẩm</Label>
        <Input placeholder="Tìm kiếm sản phẩm..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-3" />

        <ScrollArea className="h-64">
          <div className="space-y-2">
            {filtered.map((product) => {
              const isChecked = selected.some((p: any) => p._id === product._id);
              return (
                <label key={product._id} className="flex items-center justify-between px-2 py-1 rounded-md hover:bg-accent cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-sm">{product.name}</span>
                    <span className="text-sm">
                      Giá giảm: {product.retail_price.toLocaleString("vi-VN")} -&gt;{" "}
                      {handleDiscount(product.retail_price, discount_type, discount_value).toLocaleString("vi-VN")} VND
                    </span>
                  </div>
                  <Checkbox checked={isChecked} onCheckedChange={() => toggleProduct(product)} />
                </label>
              );
            })}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
