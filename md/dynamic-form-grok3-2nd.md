### Key Points

- Tạo một component DynamicForm có thể tái sử dụng cao bằng cách làm nó có thể cấu hình được các trường và quản lý trạng thái qua props từ component cha.
- Component hỗ trợ các trường tùy chỉnh với loại (text, number) hoặc component tùy chỉnh, và tự động điều chỉnh bố cục dựa trên số lượng trường.
- Trong form cha (AddProductForm), quản lý trạng thái của các mục (items) và bao gồm dữ liệu này khi gửi form.

### Giải thích Chi tiết

#### Tổng quan

Component DynamicForm ban đầu của bạn cho phép thêm và xóa các mục, mỗi mục có các trường cố định như kích cỡ, giá, và giá khuyến mãi. Để tăng tính tái sử dụng, chúng ta sẽ biến nó thành một component được kiểm soát (controlled component), nơi component cha quản lý trạng thái và truyền các props cần thiết. Điều này giúp component có thể được sử dụng trong nhiều ngữ cảnh khác nhau với các trường linh hoạt.

#### Cấu trúc Component Mới

- **Định nghĩa Trường (Fields):** Mỗi trường được định nghĩa với tên, nhãn, loại (text, number, v.v.), và tùy chọn một component tùy chỉnh. Ví dụ:
  - `{ name: 'size', label: 'Kích cỡ', type: 'text' }`
  - Hoặc `{ name: 'price', label: 'Giá', component: một component Select tùy chỉnh }`.
- **Quản lý Trạng Thái:** Component cha (như AddProductForm) sẽ quản lý danh sách các mục (items) và cung cấp các hàm:
  - `onAddItem`: Thêm mục mới.
  - `onRemoveItem`: Xóa mục dựa trên ID.
  - `onItemChange`: Cập nhật giá trị trường của một mục.
- **Bố cục Linh hoạt:** Component tự động điều chỉnh bố cục lưới (grid) dựa trên số lượng trường, đảm bảo hiển thị đẹp trên các kích thước màn hình khác nhau.

#### Cách Sử dụng trong AddProductForm

Trong AddProductForm, bạn cần:

1. Định nghĩa danh sách trường, ví dụ:
   ```jsx
   const fields = [
     { name: "size", label: "Kích cỡ", type: "text" },
     { name: "price", label: "Giá", type: "number" },
     { name: "discount_price", label: "Giá khuyến mãi", type: "number" },
   ];
   ```
2. Quản lý trạng thái `items`, ví dụ:
   ```jsx
   const [items, setItems] = useState([{ id: 1, size: "", price: "", discount_price: "" }]);
   let nextId = 2;
   const addNewItem = () => {
     const newItem = { id: nextId, size: "", price: "", discount_price: "" };
     setItems([...items, newItem]);
     nextId++;
   };
   const removeItem = (id) => setItems(items.filter((item) => item.id !== id));
   const handleItemChange = (itemId, fieldName, newValue) => {
     setItems(items.map((item) => (item.id === itemId ? { ...item, [fieldName]: newValue } : item)));
   };
   ```
3. Sử dụng component:
   ```jsx
   <DynamicForm items={items} onAddItem={addNewItem} onRemoveItem={removeItem} onItemChange={handleItemChange} fields={fields} />
   ```
4. Bao gồm dữ liệu `items` khi gửi form, ví dụ:
   ```jsx
   const newProduct = {
     ...productData,
     wholesale_price: Number(productData.wholesale_price),
     retail_price: Number(productData.retail_price),
     stock_quantity: Number(productData.stock_quantity),
     categories: selectedCategories,
     attributes: items,
   };
   ```

#### Điểm Nổi Bật

Điều thú vị là component mới không chỉ hỗ trợ các trường cơ bản như text và number mà còn cho phép bạn tùy chỉnh bằng cách cung cấp component riêng, ví dụ như một Select cho kích cỡ, mở rộng khả năng sử dụng trong nhiều trường hợp khác nhau.

---

### Báo cáo Chi tiết

#### Giới thiệu

Yêu cầu của bạn là tạo một component DynamicForm có tính tái sử dụng cao, dựa trên component hiện tại và tham khảo repo multi-select từ [GitHub - sersavan/shadcn-multi-select-component](https://github.com/sersavan/shadcn-multi-select-component). Component hiện tại cho phép thêm/xóa các mục với các trường cố định, và bạn muốn nó có thể được tùy chỉnh dễ dàng với các "command" mô tả (có thể hiểu là các props hoặc cấu hình). Chúng ta sẽ phân tích và thiết kế lại component để đạt được mục tiêu này, đồng thời đảm bảo nó hoạt động tốt trong ngữ cảnh như AddProductForm của bạn.

#### Phân tích Hiện Tình

Component DynamicForm hiện tại:

- Quản lý trạng thái nội bộ với danh sách `items`, mỗi mục có các trường cố định: `value`, `price`, `discount_price`.
- Cho phép thêm/xóa mục thông qua các hàm `addNewItem` và `removeItem`.
- Bố cục sử dụng grid với 4 cột trên màn hình lớn (3 cột cho trường, 1 cột cho nút xóa).
- Tuy nhiên, trong AddProductForm, dữ liệu từ DynamicForm không được kết nối với trạng thái `productData`, dẫn đến việc gửi form không bao gồm thông tin thuộc tính sản phẩm.

Repo multi-select từ [GitHub - sersavan/shadcn-multi-select-component](https://github.com/sersavan/shadcn-multi-select-component) là một component cho phép chọn nhiều mục, sử dụng các component từ Shadcn UI như Popover, Command, v.v. Nó có tính tái sử dụng cao nhờ các props cấu hình như danh sách tùy chọn, giá trị đã chọn, v.v. Điều này gợi ý rằng DynamicForm cũng nên có cách cấu hình linh hoạt tương tự.

#### Thiết kế Component Mới

Để tăng tính tái sử dụng, chúng ta sẽ:

1. **Làm Component Được Kiểm Soát (Controlled Component):**

   - Thay vì quản lý trạng thái nội bộ, component sẽ nhận `items` từ props và các hàm callback để xử lý thay đổi: `onAddItem`, `onRemoveItem`, `onItemChange`.
   - Điều này cho phép component cha (như AddProductForm) kiểm soát hoàn toàn trạng thái, dễ dàng tích hợp với các thư viện form như React Hook Form.

2. **Cấu Hình Trường Linh Hoạt:**

   - Thay vì trường cố định, component nhận một mảng `fields` định nghĩa các trường, mỗi trường có:
     - `name`: Tên trường, dùng làm key trong object item.
     - `label`: Nhãn hiển thị.
     - `type`: Loại trường (text, number, v.v.) để sử dụng component mặc định.
     - `component`: (Tùy chọn) Component tùy chỉnh, nhận props `value` và `onChange` để xử lý giá trị.
   - Ví dụ:
     ```jsx
     const fields = [
       { name: "size", label: "Kích cỡ", type: "text" },
       { name: "price", label: "Giá", type: "number" },
     ];
     ```
   - Nếu không có `component`, component mặc định sẽ được chọn dựa trên `type`, ví dụ:
     - `type: 'text'` → `<Input type="text" />`.
     - `type: 'number'` → `<Input type="number" />`.

3. **Bố cục Động:**

   - Bố cục grid được điều chỉnh dựa trên số lượng trường. Trên màn hình nhỏ, mỗi trường và nút xóa hiển thị theo hàng (grid-cols-1). Trên màn hình lớn (sm:), sử dụng grid với số cột bằng số trường + 1 (cột cuối cho nút xóa).
   - Để xử lý động, chúng ta xây dựng class Tailwind động, ví dụ:
     - Với 3 trường: `sm:grid-cols-[1fr_1fr_1fr_auto]`.
     - Sử dụng hàm `getGridColsClass` để tạo class dựa trên số lượng trường.

4. **Xử lý Sự Kiện:**
   - Khi thay đổi giá trị trường, gọi `onItemChange(itemId, fieldName, newValue)` để component cha cập nhật trạng thái.
   - Nút "Thêm thuộc tính" gọi `onAddItem`, nút xóa gọi `onRemoveItem` với ID tương ứng.

#### Triển khai Code

Dưới đây là code cho component DynamicForm mới:

```jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";

type FieldDefinition = {
  name: string,
  label: string,
  type?: string,
  component?: React.ComponentType<{ value: any, onChange: (value: any) => void }>,
};

type Item = {
  id: number,
  [key: string]: any,
};

type DynamicFormProps = {
  items: Item[],
  onAddItem: () => void,
  onRemoveItem: (id: number) => void,
  onItemChange: (itemId: number, fieldName: string, newValue: any) => void,
  fields: FieldDefinition[],
};

const defaultComponents = {
  text: ({ value, onChange }) => <Input type="text" value={value} onChange={(e) => onChange(e.target.value)} />,
  number: ({ value, onChange }) => <Input type="number" value={value} onChange={(e) => onChange(e.target.value)} />,
};

const FieldComponent = ({ field, value, onChange }) => {
  if (field.component) {
    return field.component({ value, onChange });
  } else if (field.type) {
    const Component = defaultComponents[field.type];
    if (Component) {
      return Component({ value, onChange });
    }
  }
  throw new Error(`No component provided for field ${field.name}`);
};

export function DynamicForm({ items, onAddItem, onRemoveItem, onItemChange, fields }: DynamicFormProps) {
  const getGridColsClass = (numFields: number) => {
    const fieldCols = Array(numFields).fill("1fr").join("_");
    return `grid grid-cols-1 gap-4 sm:grid-cols-[${fieldCols}_auto]`;
  };

  return (
    <Card className="space-y-6">
      <CardContent>
        <form className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className={getGridColsClass(fields.length)} items-end>
              {fields.map((field) => (
                <div key={field.name} className="space-y-2 pt-4">
                  <Label htmlFor={`${item.id}-${field.name}`}>{field.label}</Label>
                  <FieldComponent field={field} value={item[field.name] || ""} onChange={(newValue) => onItemChange(item.id, field.name, newValue)} />
                </div>
              ))}
              <div className="flex items-center pt-6">
                <Button type="button" variant="destructive" className="items-center" size="icon" onClick={() => onRemoveItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between mt-6">
            <Button type="button" variant="outline" size="sm" className="flex items-center gap-2" onClick={onAddItem}>
              <Plus className="h-4 w-4" />
              Thêm thuộc tính
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```

#### Hướng dẫn Sử dụng trong AddProductForm

Để tích hợp vào AddProductForm, bạn cần:

1. Định nghĩa `fields` như trên.
2. Quản lý trạng thái `items` và các hàm callback:
   - Khởi tạo `items` với ID và giá trị mặc định cho các trường.
   - `addNewItem` tạo mục mới với ID tăng dần và giá trị rỗng.
   - `removeItem` lọc danh sách dựa trên ID.
   - `handleItemChange` cập nhật giá trị trường trong `items`.
3. Truyền các props vào DynamicForm và đảm bảo bao gồm `items` trong dữ liệu gửi form.

#### Bảng So Sánh

Dưới đây là bảng so sánh giữa component cũ và mới:

| **Tiêu chí**               | **Component cũ**                       | **Component mới**                       |
| -------------------------- | -------------------------------------- | --------------------------------------- |
| Quản lý trạng thái         | Nội bộ, không kết nối với form cha     | Được kiểm soát, phụ thuộc vào props cha |
| Cấu hình trường            | Cố định (value, price, discount_price) | Linh hoạt, dựa trên mảng fields         |
| Hỗ trợ component tùy chỉnh | Không                                  | Có, qua prop component                  |
| Bố cục                     | Grid cố định 4 cột                     | Grid động, điều chỉnh theo số trường    |
| Tái sử dụng                | Thấp, chỉ phù hợp một trường hợp       | Cao, phù hợp nhiều ngữ cảnh             |

#### Kết luận

Component mới cung cấp tính tái sử dụng cao nhờ khả năng cấu hình linh hoạt và quản lý trạng thái bởi component cha. Bạn có thể dễ dàng mở rộng bằng cách thêm các loại trường hoặc component tùy chỉnh, ví dụ như Select cho kích cỡ, làm cho nó phù hợp với nhiều trường hợp sử dụng khác nhau.

#### Key Citations

- [GitHub - sersavan/shadcn-multi-select-component A multi-select component designed with shadcn/ui](https://github.com/sersavan/shadcn-multi-select-component)

---

---

---

### Key Points

- DynamicForm được tích hợp vào AddProductForm để quản lý thuộc tính sản phẩm, cho phép thêm/xóa các mục như kích cỡ, giá, giá khuyến mãi.
- Trong AddProductForm, DynamicForm được cấu hình với các trường linh hoạt, trạng thái được quản lý bởi component cha, và dữ liệu được gửi cùng form.
- Điều thú vị là DynamicForm giờ đây có thể tái sử dụng cho nhiều ngữ cảnh khác nhau, không chỉ giới hạn ở sản phẩm.

---

### Cách Tích Hợp DynamicForm vào AddProductForm

#### Tổng Quan

DynamicForm là một component linh hoạt, cho phép người dùng thêm hoặc xóa các mục, mỗi mục có các trường tùy chỉnh như kích cỡ, giá, và giá khuyến mãi. Trong trường hợp AddProductForm, nó được sử dụng để quản lý thuộc tính sản phẩm, giúp người dùng nhập thông tin chi tiết cho từng thuộc tính trước khi gửi form.

#### Cấu Hình và Sử Dụng

Trong AddProductForm, bạn cần:

1. **Định Nghĩa Các Trường**: Xác định danh sách các trường cần thiết, ví dụ:
   - Kích cỡ (text), Giá (number), Giá khuyến mãi (number).
   - Ví dụ:
     ```jsx
     const fields = [
       { name: "size", label: "Kích cỡ", type: "text" },
       { name: "price", label: "Giá", type: "number" },
       { name: "discount_price", label: "Giá khuyến mãi", type: "number" },
     ];
     ```
2. **Quản Lý Trạng Thái**: Sử dụng state để quản lý danh sách các mục (items), với mỗi mục có ID và giá trị ban đầu cho các trường. Ví dụ:
   - Khởi tạo: `const [items, setItems] = useState([{ id: 1, size: "", price: "", discount_price: "" }]);`
   - Tăng ID cho mục mới: `let nextId = 2;`
   - Thêm mục mới: Tạo mục mới với ID tăng dần và giá trị rỗng.
   - Xóa mục: Lọc danh sách dựa trên ID.
   - Cập nhật giá trị: Sử dụng hàm để thay đổi giá trị trường của một mục.
3. **Kết Nối Với DynamicForm**: Truyền các props cần thiết vào DynamicForm:
   - `items`: Danh sách các mục hiện tại.
   - `onAddItem`: Hàm thêm mục mới.
   - `onRemoveItem`: Hàm xóa mục.
   - `onItemChange`: Hàm cập nhật giá trị trường.
   - `fields`: Danh sách định nghĩa trường.
   - Ví dụ:
     ```jsx
     <DynamicForm items={items} onAddItem={addNewItem} onRemoveItem={removeItem} onItemChange={handleItemChange} fields={fields} />
     ```
4. **Gửi Dữ Liệu**: Khi gửi form, bao gồm danh liệu từ `items` vào dữ liệu sản phẩm, ví dụ:
   - Thêm `attributes: items` vào object `newProduct` trước khi gửi lên server:
     ```jsx
     const newProduct = {
       ...productData,
       wholesale_price: Number(productData.wholesale_price),
       retail_price: Number(productData.retail_price),
       stock_quantity: Number(productData.stock_quantity),
       categories: selectedCategories,
       attributes: items,
     };
     ```

#### Lợi Ích và Điểm Nổi Bật

- **Tính Tái Sử Dụng Cao**: DynamicForm không chỉ dùng cho sản phẩm mà còn có thể áp dụng cho các form khác, như quản lý địa chỉ, danh sách nhân viên, v.v., chỉ cần thay đổi danh sách `fields`.
- **Quản Lý Linh Hoạt**: Trạng thái được quản lý bởi component cha, giúp dễ dàng tích hợp với các thư viện form như React Hook Form hoặc xử lý validation.
- Điều thú vị là bạn có thể mở rộng bằng cách thêm component tùy chỉnh, ví dụ như Select cho kích cỡ, làm cho form trở nên đa dạng hơn.

---

### Báo Cáo Chi Tiết

DynamicForm là một component React được thiết kế để tạo các form động, cho phép người dùng thêm hoặc xóa các mục, mỗi mục có các trường tùy chỉnh. Trong ngữ cảnh AddProductForm, nó được sử dụng để quản lý thuộc tính sản phẩm, chẳng hạn như kích cỡ, giá, và giá khuyến mãi, trước khi gửi thông tin lên server. Báo cáo này phân tích cách tích hợp DynamicForm vào AddProductForm, bao gồm cấu hình, quản lý trạng thái, và lợi ích của thiết kế này.

#### Phân Tích Yêu Cầu

AddProductForm là một form để thêm sản phẩm mới, bao gồm các trường như tên sản phẩm, mô tả, giá bán buôn, giá bán lẻ, danh mục, và hình ảnh. Trong đó, phần "Thuộc tính sản phẩm" được quản lý bởi DynamicForm, cho phép người dùng nhập thông tin chi tiết cho từng thuộc tính, như kích cỡ và giá. Yêu cầu là tích hợp DynamicForm một cách hiệu quả, đảm bảo dữ liệu được gửi đúng và component có tính tái sử dụng cao.

#### Thiết Kế và Triển Khai

Để tích hợp DynamicForm vào AddProductForm, chúng ta cần thực hiện các bước sau:

1. **Định Nghĩa Các Trường (Fields)**:

   - Các trường được định nghĩa trong một mảng, mỗi trường có tên (`name`), nhãn (`label`), và loại (`type`). Ví dụ:
     ```jsx
     const fields = [
       { name: "size", label: "Kích cỡ", type: "text" },
       { name: "price", label: "Giá", type: "number" },
       { name: "discount_price", label: "Giá khuyến mãi", type: "number" },
     ];
     ```
   - Loại `type` (text, number) quyết định component mặc định được sử dụng, ví dụ Input với type tương ứng. Nếu cần, có thể cung cấp component tùy chỉnh qua prop `component`.

2. **Quản Lý Trạng Thái (State Management)**:

   - Trong AddProductForm, trạng thái `items` được quản lý bằng useState, khởi tạo với một mục mặc định, ví dụ:
     ```jsx
     const [items, setItems] = useState([{ id: 1, size: "", price: "", discount_price: "" }]);
     ```
   - ID cho mục mới được tăng dần, ví dụ:
     - Khởi tạo `let nextId = 2;`
     - Khi thêm mục mới, tạo object mới với ID và giá trị rỗng cho các trường:
       ```jsx
       const addNewItem = () => {
         const newItem = { id: nextId, ...fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}) };
         setItems([...items, newItem]);
         nextId++;
       };
       ```
   - Xóa mục dựa trên ID:
     ```jsx
     const removeItem = (id) => setItems((items) => items.filter((item) => item.id !== id));
     ```
   - Cập nhật giá trị trường:
     ```jsx
     const handleItemChange = (itemId, fieldName, newValue) => {
       setItems((items) => items.map((item) => (item.id === itemId ? { ...item, [fieldName]: newValue } : item)));
     };
     ```

3. **Kết Nối Với DynamicForm**:

   - DynamicForm được gọi với các props cần thiết:
     ```jsx
     <DynamicForm items={items} onAddItem={addNewItem} onRemoveItem={removeItem} onItemChange={handleItemChange} fields={fields} />
     ```
   - Component này sẽ render giao diện dựa trên `fields`, với mỗi mục là một grid chứa các trường và nút xóa. Bố cục grid được điều chỉnh động, ví dụ:
     - Với 3 trường, grid trên màn hình lớn sẽ là `sm:grid-cols-[1fr_1fr_1fr_auto]`, với cột cuối cho nút xóa.

4. **Gửi Dữ Liệu Form**:
   - Khi gửi form, dữ liệu từ `items` cần được bao gồm trong object `newProduct`. Trong hàm `handleSubmit`, thêm:
     ```jsx
     const newProduct = {
       ...productData,
       wholesale_price: Number(productData.wholesale_price),
       retail_price: Number(productData.retail_price),
       stock_quantity: Number(productData.stock_quantity),
       categories: selectedCategories,
       attributes: items,
     };
     ```
   - Dữ liệu `attributes` (tức là `items`) sẽ được gửi lên server, giả sử server chấp nhận một mảng các object với các trường như kích cỡ, giá, v.v.

#### Lợi Ích và Điểm Nổi Bật

- **Tính Tái Sử Dụng Cao**: Thiết kế này cho phép DynamicForm được sử dụng không chỉ trong AddProductForm mà còn trong các form khác, như quản lý danh sách địa chỉ, danh sách nhân viên, v.v. Chỉ cần thay đổi mảng `fields`, component sẽ tự động điều chỉnh giao diện.
- **Quản Lý Linh Hoạt**: Vì trạng thái được quản lý bởi component cha, AddProductForm có thể dễ dàng tích hợp với các thư viện form như React Hook Form, hoặc xử lý validation, lỗi, v.v.
- **Điều Thú Vị**: Một điểm đáng chú ý là DynamicForm giờ đây hỗ trợ component tùy chỉnh, ví dụ như Select cho trường kích cỡ, mở rộng khả năng sử dụng trong nhiều ngữ cảnh khác nhau, không chỉ giới hạn ở input text hoặc number.

#### Bảng So Sánh Trước và Sau

Dưới đây là bảng so sánh cách quản lý thuộc tính trước và sau khi tích hợp DynamicForm:

| **Tiêu chí**               | **Trước (Cố Định)**                    | **Sau (Linh Hoạt)**                     |
| -------------------------- | -------------------------------------- | --------------------------------------- |
| Quản lý trạng thái         | Nội bộ, không kết nối với form cha     | Được kiểm soát, phụ thuộc vào props cha |
| Cấu hình trường            | Cố định (kích cỡ, giá, giá khuyến mãi) | Linh hoạt, dựa trên mảng fields         |
| Hỗ trợ component tùy chỉnh | Không                                  | Có, qua prop component                  |
| Bố cục                     | Grid cố định 4 cột                     | Grid động, điều chỉnh theo số trường    |
| Tái sử dụng                | Thấp, chỉ phù hợp một trường hợp       | Cao, phù hợp nhiều ngữ cảnh             |

#### Kết Luận

Việc tích hợp DynamicForm vào AddProductForm không chỉ cải thiện khả năng quản lý thuộc tính sản phẩm mà còn tăng tính tái sử dụng của component. Bằng cách cấu hình linh hoạt các trường và quản lý trạng thái bởi component cha, bạn có thể dễ dàng mở rộng ứng dụng cho các trường hợp khác, đồng thời đảm bảo dữ liệu được gửi đúng và hiệu quả.

---

### Key Citations

- [GitHub - sersavan/shadcn-multi-select-component A multi-select component designed with shadcn/ui](https://github.com/sersavan/shadcn-multi-select-component)
