Dưới đây là một phiên bản "dynamic form" được cải tiến nhằm tối ưu khả năng tái sử dụng. Component mới này cho phép bạn định nghĩa các trường (fields) thông qua một mảng cấu hình, đồng thời có thể nhận giá trị khởi tạo và callback khi dữ liệu thay đổi. Bạn có thể dễ dàng tái sử dụng component này trong các trường hợp khác nhau chỉ cần thay đổi cấu hình các field và cách xử lý dữ liệu đầu ra.

---

### Mã nguồn component ReusableDynamicForm.tsx

```tsx
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
    <Card className="space-y-6">
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
        <div className="flex items-center justify-end mt-6">
          <Button type="button" variant="outline" size="sm" className="flex items-center gap-2" onClick={addNewItem}>
            <Plus className="h-4 w-4" />
            Thêm trường
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

### Cách sử dụng trong một form (ví dụ trong AddProductForm)

Giả sử bạn có một form thêm sản phẩm và muốn sử dụng dynamic form này cho thuộc tính sản phẩm, bạn chỉ cần truyền cấu hình các trường cần thiết:

```tsx
import { ReusableDynamicForm, FieldConfig } from "./ReusableDynamicForm";

const attributeFields: FieldConfig[] = [
  { name: "size", label: "Kích cỡ", placeholder: "Chọn kích cỡ" },
  { name: "price", label: "Giá", placeholder: "Nhập giá bán", type: "number" },
  { name: "discount_price", label: "Giá khuyến mãi", placeholder: "Nhập giá khuyến mãi", type: "number" },
];

export default function AddProductForm() {
  // Các state và logic xử lý khác của form

  const handleAttributesChange = (attributes: Record<string, any>[]) => {
    // Xử lý dữ liệu thuộc tính sản phẩm tại đây
    console.log("Attributes changed:", attributes);
  };

  return (
    <form className="space-y-6">
      {/* Các trường input khác của sản phẩm */}
      <div className="grid gap-2">
        <Label htmlFor="attributes">Thuộc tính sản phẩm</Label>
        <ReusableDynamicForm fields={attributeFields} onChange={handleAttributesChange} />
      </div>
      {/* Nút submit và các thành phần khác */}
    </form>
  );
}
```

---

### Giải thích và điểm nổi bật

- **Cấu hình linh hoạt:** Bạn có thể dễ dàng thay đổi số lượng và loại trường nhập liệu bằng cách cấu hình lại mảng `fields` mà không cần chỉnh sửa lại logic của component.
- **Khả năng mở rộng:** Component hỗ trợ nhận giá trị khởi tạo (nếu có) và cung cấp callback `onChange` để gửi dữ liệu ra bên ngoài, giúp tích hợp dễ dàng vào các form phức tạp.
- **Giao diện thống nhất:** Sử dụng các component giao diện từ shadcn UI (như Card, Input, Label, Button) đảm bảo sự nhất quán và dễ tùy chỉnh theo style của dự án.

Với cách tiếp cận này, bạn có thể tái sử dụng component dynamic form cho nhiều trường hợp khác nhau chỉ với việc thay đổi cấu hình, từ đó giảm thiểu việc lặp lại mã nguồn và tăng tính linh hoạt trong phát triển giao diện người dùng.
