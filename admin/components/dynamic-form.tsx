"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export interface FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type?: string; // Ví dụ: "text", "number", "email",…
}

export interface ReusableDynamicFormProps {
  /** Mảng cấu hình cho các trường */
  fields: FieldConfig[];
  /** Giá trị khởi tạo của danh sách item */
  initialItems?: Record<string, any>[];
  /** Callback trả về dữ liệu mới khi thay đổi */
  onChange?: (items: Record<string, any>[]) => void;
}

export function ReusableDynamicForm({ fields, initialItems = [], onChange }: ReusableDynamicFormProps) {
  // Khởi tạo một item với các key tương ứng theo cấu hình fields
  const initializeItem = (item?: Record<string, any>) => {
    const newItem: Record<string, any> = {};
    fields.forEach((field) => {
      newItem[field.name] = item && field.name in item ? item[field.name] : "";
    });
    return newItem;
  };

  // Nếu không có giá trị khởi tạo, khởi tạo ít nhất 1 item
  const [items, setItems] = useState<Record<string, any>[]>(initialItems.length > 0 ? initialItems.map(initializeItem) : [initializeItem()]);

  const addNewItem = () => {
    const newItems = [...items, initializeItem()];
    setItems(newItems);
    onChange && onChange(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange && onChange(newItems);
  };

  const handleFieldChange = (index: number, fieldName: string, value: any) => {
    const newItems = items.map((item, i) => (i === index ? { ...item, [fieldName]: value } : item));
    setItems(newItems);
    onChange && onChange(newItems);
  };

  return (
    <Card className="space-y-6 pt-2">
      <CardContent>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] items-end">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={`${field.name}-${index}`}>{field.label}</Label>
                <Input
                  id={`${field.name}-${index}`}
                  placeholder={field.placeholder}
                  type={field.type || "text"}
                  value={item[field.name]}
                  onChange={(e) => handleFieldChange(index, field.name, e.target.value)}
                />
              </div>
            ))}
            <div className="flex items-center">
              <Button type="button" variant="destructive" size="icon" onClick={() => removeItem(index)}>
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
      </CardContent>
    </Card>
  );
}
