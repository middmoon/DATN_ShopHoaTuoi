export interface Product {
  _id: number;
  name?: string;
  retail_price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer_email: string;
  customer_name: string;
  status: "complete" | "pending" | "cancel";
  total_amount: number;
  customer_phone: string;
  note: string;
  address: string;
  ward_code: string;
  ward_name: string;
  district_code: string;
  district_name: string;
  province_code: string;
  province_name: string;
  payment_status: string;
  products: Product[];
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    customer_email: "nguyenvana@gmail.com",
    customer_name: "Nguyễn Văn A",
    status: "complete",
    total_amount: 2450000,
    customer_phone: "01235567118",
    note: "Shop giao trước thứ 7",
    address: "123 Trần Phú",
    ward_code: "24769",
    ward_name: "Phường 7",
    district_code: "672",
    district_name: "Thành phố Đà Lạt",
    province_code: "68",
    province_name: "Tỉnh Lâm Đồng",
    payment_status: "Paid",
    products: [
      {
        _id: 1,
        name: "Product A",
        retail_price: 850000,
        quantity: 1,
      },
      {
        _id: 2,
        name: "Product B",
        retail_price: 800000,
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD-002",
    customer_email: "tranb@gmail.com",
    customer_name: "Trần Thị B",
    status: "pending",
    total_amount: 1200000,
    customer_phone: "0987654321",
    note: "Gọi trước khi giao",
    address: "456 Lê Lợi",
    ward_code: "24770",
    ward_name: "Phường 8",
    district_code: "672",
    district_name: "Thành phố Đà Lạt",
    province_code: "68",
    province_name: "Tỉnh Lâm Đồng",
    payment_status: "Pending",
    products: [
      {
        _id: 3,
        name: "Product C",
        retail_price: 1200000,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-003",
    customer_email: "lec@gmail.com",
    customer_name: "Lê Văn C",
    status: "cancel",
    total_amount: 3500000,
    customer_phone: "0123456789",
    note: "Khách hủy đơn",
    address: "789 Nguyễn Huệ",
    ward_code: "24771",
    ward_name: "Phường 9",
    district_code: "672",
    district_name: "Thành phố Đà Lạt",
    province_code: "68",
    province_name: "Tỉnh Lâm Đồng",
    payment_status: "Refunded",
    products: [
      {
        _id: 4,
        name: "Product D",
        retail_price: 1750000,
        quantity: 2,
      },
    ],
  },
];
