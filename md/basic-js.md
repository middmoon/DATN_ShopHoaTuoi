Dưới đây là **các phương thức phổ biến của từng kiểu dữ liệu trong JavaScript**:

---

# 📌 **1. String (`string`)**

Chuỗi có nhiều phương thức hữu ích để thao tác với văn bản.

| Phương thức                 | Mô tả                                         | Ví dụ                                   |
| --------------------------- | --------------------------------------------- | --------------------------------------- |
| `.length`                   | Lấy độ dài chuỗi                              | `"hello".length // 5`                   |
| `.toUpperCase()`            | Chuyển thành chữ hoa                          | `"hello".toUpperCase() // "HELLO"`      |
| `.toLowerCase()`            | Chuyển thành chữ thường                       | `"HELLO".toLowerCase() // "hello"`      |
| `.charAt(index)`            | Lấy ký tự tại vị trí `index`                  | `"hello".charAt(1) // "e"`              |
| `.indexOf(substring)`       | Tìm vị trí đầu tiên của `substring`           | `"hello".indexOf("l") // 2`             |
| `.includes(substring)`      | Kiểm tra chuỗi có chứa `substring` không      | `"hello".includes("he") // true`        |
| `.slice(start, end)`        | Cắt chuỗi từ `start` đến `end`                | `"hello".slice(1, 4) // "ell"`          |
| `.substring(start, end)`    | Giống `.slice()`, nhưng không nhận giá trị âm | `"hello".substring(1, 4) // "ell"`      |
| `.split(separator)`         | Tách chuỗi thành mảng                         | `"a,b,c".split(",") // ["a", "b", "c"]` |
| `.trim()`                   | Loại bỏ khoảng trắng hai đầu                  | `"  hello  ".trim() // "hello"`         |
| `.replace(search, replace)` | Thay thế chuỗi con                            | `"hello".replace("l", "x") // "hexlo"`  |

---

# 📌 **2. Number (`number`)**

Số có các phương thức để tính toán.

| Phương thức           | Mô tả                                | Ví dụ                                   |
| --------------------- | ------------------------------------ | --------------------------------------- |
| `.toFixed(n)`         | Làm tròn số với `n` chữ số thập phân | `(3.14159).toFixed(2) // "3.14"`        |
| `.toString()`         | Chuyển số thành chuỗi                | `(123).toString() // "123"`             |
| `.toExponential(n)`   | Chuyển thành số mũ với `n` chữ số    | `(12345).toExponential(2) // "1.23e+4"` |
| `.toPrecision(n)`     | Làm tròn với `n` chữ số tổng cộng    | `(123.456).toPrecision(4) // "123.5"`   |
| `Number.isInteger(x)` | Kiểm tra số nguyên                   | `Number.isInteger(10) // true`          |
| `Number.isNaN(x)`     | Kiểm tra `NaN`                       | `Number.isNaN("abc" * 2) // true`       |

---

# 📌 **3. Boolean (`boolean`)**

Boolean (`true` / `false`) thường được sử dụng trong điều kiện logic.

| Phương thức  | Mô tả                                                   | Ví dụ                                       |
| ------------ | ------------------------------------------------------- | ------------------------------------------- |
| `Boolean(x)` | Chuyển giá trị thành boolean                            | `Boolean(0) // false`, `Boolean(1) // true` |
| `!!x`        | Chuyển giá trị sang boolean (viết tắt của `Boolean(x)`) | `!!"hello" // true`, `!!0 // false`         |

---

# 📌 **4. Array (`[]`)**

Mảng chứa nhiều phần tử và có rất nhiều phương thức hữu ích.

| Phương thức                       | Mô tả                               | Ví dụ                                          |
| --------------------------------- | ----------------------------------- | ---------------------------------------------- |
| `.length`                         | Độ dài mảng                         | `[1,2,3].length // 3`                          |
| `.push(x)`                        | Thêm phần tử vào cuối mảng          | `let a = [1,2]; a.push(3); // [1,2,3]`         |
| `.pop()`                          | Xóa phần tử cuối cùng               | `let a = [1,2,3]; a.pop(); // [1,2]`           |
| `.shift()`                        | Xóa phần tử đầu tiên                | `let a = [1,2,3]; a.shift(); // [2,3]`         |
| `.unshift(x)`                     | Thêm phần tử vào đầu mảng           | `let a = [2,3]; a.unshift(1); // [1,2,3]`      |
| `.concat(arr)`                    | Nối mảng                            | `[1,2].concat([3,4]) // [1,2,3,4]`             |
| `.join(separator)`                | Nối các phần tử thành chuỗi         | `[1,2,3].join("-") // "1-2-3"`                 |
| `.slice(start, end)`              | Cắt mảng từ `start` đến `end`       | `[1,2,3,4].slice(1,3) // [2,3]`                |
| `.splice(start, count, ...items)` | Xóa & thêm phần tử vào mảng         | `let a = [1,2,3]; a.splice(1,1,9); // [1,9,3]` |
| `.indexOf(x)`                     | Tìm vị trí phần tử                  | `[1,2,3].indexOf(2) // 1`                      |
| `.includes(x)`                    | Kiểm tra xem mảng có chứa `x` không | `[1,2,3].includes(2) // true`                  |
| `.map(fn)`                        | Áp dụng hàm `fn` lên từng phần tử   | `[1,2,3].map(x => x*2) // [2,4,6]`             |
| `.filter(fn)`                     | Lọc phần tử theo điều kiện `fn`     | `[1,2,3,4].filter(x => x % 2 == 0) // [2,4]`   |
| `.reduce(fn, initialValue)`       | Giảm mảng thành một giá trị         | `[1,2,3].reduce((acc, x) => acc + x, 0) // 6`  |

---

# 📌 **5. Object (`{}`)**

Object chứa các cặp `key-value`.

| Phương thức                     | Mô tả                                        | Ví dụ                                             |
| ------------------------------- | -------------------------------------------- | ------------------------------------------------- |
| `Object.keys(obj)`              | Lấy danh sách key                            | `Object.keys({a:1, b:2}) // ["a", "b"]`           |
| `Object.values(obj)`            | Lấy danh sách value                          | `Object.values({a:1, b:2}) // [1, 2]`             |
| `Object.entries(obj)`           | Lấy danh sách key-value dạng mảng            | `Object.entries({a:1, b:2}) // [["a",1],["b",2]]` |
| `Object.assign(target, source)` | Sao chép thuộc tính từ `source` vào `target` | `Object.assign({x:1}, {y:2}) // {x:1, y:2}`       |

---

# 📌 **6. Function (`function`)**

| Phương thức               | Mô tả                                        | Ví dụ                                                                       |
| ------------------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| `.call(thisArg, ...args)` | Gọi hàm với `thisArg`                        | `function greet() { console.log(this.name); } greet.call({name: "Alice"});` |
| `.apply(thisArg, [args])` | Giống `.call()` nhưng truyền mảng tham số    | `greet.apply({name: "Alice"}, [])`                                          |
| `.bind(thisArg)`          | Trả về một hàm mới với `this` được ràng buộc | `const newFunc = greet.bind({name: "Alice"}); newFunc();`                   |

---

# 📌 **7. Set & Map**

| Phương thức        | Mô tả                                 | Ví dụ                               |
| ------------------ | ------------------------------------- | ----------------------------------- |
| `.add(value)`      | Thêm phần tử vào `Set`                | `let s = new Set(); s.add(1);`      |
| `.has(value)`      | Kiểm tra phần tử có trong `Set` không | `s.has(1) // true`                  |
| `.delete(value)`   | Xóa phần tử                           | `s.delete(1)`                       |
| `.set(key, value)` | Thêm phần tử vào `Map`                | `let m = new Map(); m.set("a", 1);` |
| `.get(key)`        | Lấy giá trị từ `Map`                  | `m.get("a") // 1`                   |

---

## 🚀 **Tóm tắt**

- **Chuỗi (`string`)**: `length`, `slice()`, `replace()`, `toUpperCase()`, `split()`
- **Số (`number`)**: `toFixed()`, `isInteger()`
- **Mảng (`array`)**: `push()`, `pop()`, `map()`, `filter()`, `reduce()`
- **Đối tượng (`object`)**: `Object.keys()`, `Object.values()`
- **Hàm (`function`)**: `call()`, `apply()`, `bind()`

Bạn muốn tìm hiểu kỹ hơn phương thức nào không? 😃
