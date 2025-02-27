import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const products = [
  {
    _id: 1,
    name: "Mẹ yêu - Mama Love",
    description: "Mother's Day đây là dịp để con cái tỏ lòng biết ơn công sinh thành, nuôi dưỡng của mẹ...",
    retail_price: 850000,
    status: "Còn hàng",
    slug: "hoa-tuoi-tang-me-ngay-le-1",
    unit: "Giỏ",
    is_feature: true,
    is_public: true,
    categories: [
      { _id: 1, name: "Đối Tượng" },
      { _id: 8, name: "Hoa Tặng Mẹ" },
    ],
    images: [
      {
        img_url: "https://drive.google.com/thumbnail?id=1p3hymvF55qe2neKy3M-j7zWie2K2yAaY",
        is_avatar: true,
      },
    ],
  },
  {
    _id: 2,
    name: "Hoa khai trương - Congratulations 1",
    description: "Kệ hoa với tone đỏ rực rỡ cùng kiểu dáng hiện đại thật sự nổi bật...",
    retail_price: 2500000,
    status: "Còn hàng",
    slug: "hoa-khai-truong-1",
    unit: "Lãng hoa",
    is_feature: true,
    is_public: false,
    categories: [
      { _id: 4, name: "Chủ Đề" },
      { _id: 21, name: "Lãng Hoa Khai Trương" },
    ],
    images: [
      {
        img_url: "https://drive.google.com/thumbnail?id=1JzYM3gz0T9z6-Z55pL13Z-jxROFJXxpf",
        is_avatar: true,
      },
    ],
  },
];

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <Card key={product._id}>
          <CardHeader>
            <div className="w-full h-40 relative">
              <Image
                src={product.images[0]?.img_url || "/placeholder.jpg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
            <p className="font-semibold text-lg text-red-500">{product.retail_price.toLocaleString()} VND</p>
            {/* <div className="flex gap-2 my-2">
              {product.categories.map((category) => (
                <Badge key={category._id}>{category.name}</Badge>
              ))}
            </div> */}
            <Button variant="outline" className="mt-2 w-full">
              Xem chi tiết
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
