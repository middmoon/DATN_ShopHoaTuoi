### Key Points

- Tạo một component React có thể tái sử dụng với các tính năng tùy chỉnh qua props.
- Component cho phép thêm, xóa và chỉnh sửa các mục động với các trường tùy chỉnh.
- Dễ dàng tích hợp với giao diện hiện có, hỗ trợ đa ngôn ngữ như tiếng Việt.

### Giải thích chi tiết

**Giới thiệu về Component**  
Component `DynamicForm` được thiết kế để quản lý danh sách các mục (items) với các trường tùy chỉnh, giống như form trong yêu cầu của bạn. Nó cho phép người dùng thêm mới, xóa bỏ và chỉnh sửa các mục, với khả năng tùy chỉnh qua các props như danh sách trường, giá trị ban đầu, và nhãn nút.

**Cách hoạt động**

- **Props chính**:
  - `fields`: Mảng các đối tượng định nghĩa trường (label, type, placeholder, name, default).
  - `initialItems`: Mảng các mục ban đầu, mỗi mục có `id` và các thuộc tính tương ứng với `fields`.
  - `onItemsChange`: Hàm được gọi khi danh sách mục thay đổi, giúp cha truyền thông tin.
  - `addButtonLabel`: Nhãn cho nút thêm mới (mặc định là "Add item").
- Component tự quản lý trạng thái danh sách mục, đảm bảo mỗi mục có `id` duy nhất để xử lý thêm/xóa.
- Giao diện tự động điều chỉnh dựa trên số lượng trường, với bố cục lưới linh hoạt cho màn hình lớn và nhỏ.

**Ví dụ sử dụng**  
Để tái tạo form trong yêu cầu của bạn, bạn có thể sử dụng như sau:

```javascript
const fields = [
  { label: "Kích cỡ", type: "text", placeholder: "Chọn kích cỡ", name: "value", default: "" },
  { label: "Giá", type: "number", placeholder: "Nhập giá bán", name: "price", default: "" },
  { label: "Giá khuyến mãi", type: "number", placeholder: "Nhập giá khuyến mãi", name: "discount_price", default: "" },
];

const initialItems = [{ id: 1, value: "", price: "", discount_price: "" }];

function ParentComponent() {
  const [formData, setFormData] = useState([]);

  const handleItemsChange = (items) => {
    setFormData(items);
  };

  return <DynamicForm fields={fields} initialItems={initialItems} onItemsChange={handleItemsChange} addButtonLabel="Thêm thuộc tính" />;
}
```

Điều thú vị là component tự động điều chỉnh bố cục dựa trên số lượng trường, đảm bảo giao diện đẹp trên cả màn hình lớn và nhỏ.

---

### Báo cáo chi tiết

#### Giới thiệu

Component `DynamicForm` được phát triển để đáp ứng nhu cầu tạo một form động, tái sử dụng trong React, với khả năng tùy chỉnh qua props. Đây là một giải pháp linh hoạt, cho phép quản lý danh sách các mục với các trường tùy chỉnh, phù hợp với yêu cầu của bạn về một component giống như form đã cung cấp, nhưng có thể mở rộng và tái sử dụng.

#### Phân tích yêu cầu

Yêu cầu ban đầu là xây dựng một component tương tự form trong mã nguồn, với các tính năng như:

- Quản lý danh sách mục (items) với các trường như kích cỡ, giá, giá khuyến mãi.
- Cho phép thêm mới và xóa mục.
- Tùy chỉnh qua props để tái sử dụng trong các ngữ cảnh khác nhau.

Form ban đầu sử dụng các component UI như `Card`, `Button`, `Input`, `Label` từ thư viện, với giao diện hỗ trợ tiếng Việt (nhãn như "Kích cỡ", "Giá", "Thêm thuộc tính"). Điều này cho thấy nhu cầu về tính quốc tế hóa và linh hoạt trong thiết kế.

#### Thiết kế component

Để đáp ứng yêu cầu, component được thiết kế với các props sau:

| Prop             | Kiểu dữ liệu                | Mô tả                                                                   |
| ---------------- | --------------------------- | ----------------------------------------------------------------------- |
| `fields`         | Mảng đối tượng              | Định nghĩa các trường, bao gồm label, type, placeholder, name, default. |
| `initialItems`   | Mảng đối tượng              | Danh sách mục ban đầu, mỗi mục có `id` và các thuộc tính tương ứng.     |
| `onItemsChange`  | Hàm (tùy chọn)              | Hàm được gọi khi danh sách mục thay đổi, truyền danh sách mới.          |
| `addButtonLabel` | Chuỗi (mặc định "Add item") | Nhãn cho nút thêm mới, hỗ trợ tùy chỉnh ngôn ngữ.                       |

##### Quản lý trạng thái

Component sử dụng `useState` để quản lý danh sách mục (`items`), khởi tạo từ `initialItems`. Mỗi mục được đảm bảo có `id` duy nhất, được gán tự động nếu không có (`Date.now()`). Điều này giúp xử lý thêm/xóa một cách chính xác.

##### Xử lý sự kiện

- **Thêm mục mới**: Tạo một mục mới với các thuộc tính rỗng hoặc giá trị mặc định từ `fields.default`.
- **Xóa mục**: Lọc danh sách để loại bỏ mục có `id` tương ứng.
- **Cập nhật trường**: Khi người dùng thay đổi giá trị trường, component cập nhật trạng thái và gọi `onItemsChange` nếu được cung cấp.

##### Bố cục giao diện

Giao diện sử dụng lưới (`grid`) với bố cục động dựa trên số lượng trường:

- Trên màn hình nhỏ, các trường hiển thị theo cột đơn (`grid-cols-1`).
- Trên màn hình lớn (`sm` trở lên), sử dụng `gridTemplateColumns` để phân bổ cột, với mỗi trường chiếm `1fr` và cột nút xóa chiếm `0.5fr`. Điều này đảm bảo giao diện linh hoạt, tự động điều chỉnh theo số lượng trường.

#### Triển khai chi tiết

Dưới đây là mã nguồn hoàn chỉnh cho component `DynamicForm`:

```javascript
import { useState, useEffect } from "react";
import { Card, CardContent, Button, Input, Label } from "@/components/ui";
import { Plus, Trash2 } from "lucide-react";

export function DynamicForm({ fields, initialItems, onItemsChange, addButtonLabel = "Add item" }) {
  const [items, setItems] = useState(
    initialItems.map((item) => {
      return { ...item, id: item.id || Date.now() };
    })
  );

  useEffect(() => {
    if (onItemsChange) {
      onItemsChange(items);
    }
  }, [items, onItemsChange]);

  const handleFieldChange = (itemId, fieldName, value) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, [fieldName]: value };
        }
        return item;
      });
      return newItems;
    });
  };

  const addNewItem = () => {
    const newItem = {};
    fields.forEach((field) => {
      newItem[field.name] = field.default ?? "";
    });
    newItem.id = Date.now();
    setItems([...items, newItem]);
  };

  const removeItem = (itemId) => {
    setItems((items) => items.filter((item) => item.id !== itemId));
  };

  return (
    <Card className="space-y-6">
      <CardContent>
        <form className="space-y-6">
          {items.map((item) => {
            const fieldCount = fields.length;
            return (
              <div key={item.id} className="grid grid-cols-1 gap-4 items-end" style={{ gridTemplateColumns: `repeat(${fieldCount}, 1fr) 0.5fr` }}>
                {fields.map((field) => (
                  <div key={field.name} className="space-y-2 pt-4">
                    <Label htmlFor={field.name + "-" + item.id}>{field.label}</Label>
                    <Input
                      id={field.name + "-" + item.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={item[field.name]}
                      onChange={(e) => handleFieldChange(item.id, field.name, e.target.value)}
                    />
                  </div>
                ))}
                <div className="flex items-center pt-6">
                  <Button type="button" variant="destructive" className="items-center" size="icon" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-between mt-6">
            <Button type="button" variant="outline" size="sm" className="flex items-center gap-2" onClick={addNewItem}>
              <Plus className="h-4 w-4" />
              {addButtonLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```

#### Hướng dẫn sử dụng

Để sử dụng component, cha cần cung cấp các props như đã mô tả. Ví dụ, để tái tạo form ban đầu:

- Định nghĩa `fields` với nhãn tiếng Việt như "Kích cỡ", "Giá", "Giá khuyến mãi".
- Cung cấp `initialItems` với ít nhất một mục ban đầu, mỗi mục có `id` và các thuộc tính tương ứng.
- Có thể truyền `addButtonLabel` là "Thêm thuộc tính" để phù hợp với giao diện ban đầu.
- Nếu cần theo dõi thay đổi, truyền `onItemsChange` để nhận danh sách mục mới.

#### Kiểm tra và mở rộng

Component đã được thiết kế để xử lý:

- Số lượng trường khác nhau (2, 3, 4, v.v.), với bố cục lưới tự động điều chỉnh.
- Các loại trường khác nhau (text, number, v.v.), với giá trị mặc định tùy chỉnh qua `default`.
- Ngôn ngữ tùy chỉnh, vì nhãn và placeholder được định nghĩa qua props.

Một điểm thú vị là component tự động gán `id` nếu mục ban đầu không có, đảm bảo tính duy nhất cho mỗi mục.

#### Kết luận

Component `DynamicForm` cung cấp một giải pháp tái sử dụng, linh hoạt, đáp ứng yêu cầu của bạn về một form động với khả năng tùy chỉnh qua props. Bạn có thể tích hợp nó vào dự án hiện tại, điều chỉnh giao diện nếu cần, và mở rộng thêm tính năng như xác thực nếu yêu cầu.

#### Key Citations

- [Dynamic Forms in React A Guide to Implementing Reusable Components and Factory Patterns Medium](https://medium.com/@sassenthusiast/dynamic-forms-in-react-a-guide-to-implementing-reusable-components-and-factory-patterns-2a029776455b)
- [How to Build Dynamic Forms in React FreeCodeCamp](https://www.freecodecamp.org/news/build-dynamic-forms-in-react/)
- [Demonstrating Reusable React Components In A Form CSS-Tricks](https://css-tricks.com/demonstrating-reusable-react-components-in-a-form/)
- [Add and Remove Form fields dynamically with React and React Hooks SJ Innovation LLC](https://sjinnovation.com/add-and-remove-form-fields-dynamically-react-and-react-hooks)
- [How to Build Dynamic Forms in React GeeksforGeeks](https://www.geeksforgeeks.org/how-to-build-dynamic-forms-in-react/)
- [Dynamic Form Fields in React DEV Community](https://dev.to/fuchodeveloper/dynamic-form-fields-in-react-1h6c)
- [Creating Dynamic Forms With React JS A Step-by-Step Guide Jobsity](https://www.jobsity.com/blog/how-to-create-a-dynamic-form-using-react-js)
- [Creating Dynamic Forms with React Hooks LINQ to Fail](https://www.aaron-powell.com/posts/2020-12-10-dynamic-forms-with-react-hooks/)
- [How to make forms reusable and dynamic in React DEV Community](https://dev.to/sarahnosal/how-to-make-forms-reusable-and-dynamic-in-react-1em2)
- [How to implement a dynamic form with controlled components in ReactJS Stack Overflow](https://stackoverflow.com/questions/42316604/how-to-implement-a-dynamic-form-with-controlled-components-in-reactjs)
