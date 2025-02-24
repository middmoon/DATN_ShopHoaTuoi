"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export function DynamicForm() {
  const [items, setItems] = useState([{ id: 1, value: "", price: "", discount_price: "" }]);

  const addNewItem = () => {
    setItems([...items, { id: items.length + 1, value: "", price: "", discount_price: "" }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Card className="space-y-6">
      <CardContent>
        <form className="space-y-6 ">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 gap-4 sm:grid-cols-[3fr_3fr_3fr_1fr] items-end">
              <div className="space-y-2 pt-4">
                <Label htmlFor={`value-${item.id}`}>Kích cỡ</Label>
                <Input id={`value-${item.id}`} placeholder="Chọn kích cỡ" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`price-${item.id}`}>Giá</Label>
                <Input id={`price-${item.id}`} type="number" placeholder="Nhập giá bán" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`discount_price-${item.id}`}>Giá khuyến mãi</Label>
                <Input id={`discount_price-${item.id}`} type="number" placeholder="Nhập giá khuyến mãi" />
              </div>
              <div className="flex items-center pt-6">
                <Button type="button" variant="destructive" className="items-center" size="icon" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between mt-6">
            <Button type="button" variant="outline" size="sm" className="flex items-center gap-2" onClick={addNewItem}>
              <Plus className="h-4 w-4" />
              Thêm thuộc tính
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
