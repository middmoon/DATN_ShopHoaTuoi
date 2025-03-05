"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Dữ liệu biểu đồ
const chartData = [
  { category: "Đơn mới", value: 186, fill: "hsl(var(--create))" },
  { category: "Đơn bị hủy", value: 305, fill: "hsl(var(--delete))" },
  { category: "Đơn hoàn hàng", value: 237, fill: "hsl(var(--failure))" },
];

// Cấu hình biểu đồ
const chartConfig = {
  value: {
    label: "Số lượng",
    color: "hsl(var(--create))", // Màu mặc định
  },
  create: {
    label: "Đơn mới",
    color: "hsl(var(--create))", // Xanh lá
  },
  delete: {
    label: "Đơn bị hủy",
    color: "hsl(var(--delete))", // Đỏ
  },
  failure: {
    label: "Đơn hoàn hàng",
    color: "hsl(var(--failure))", // Đỏ tươi
  },
} satisfies ChartConfig;

export function ChartTestComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="pb-2">Tổng quan đơn hàng - Tháng 1 - 2025</CardTitle>
        <CardTitle>Tổng đơn: 3000</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)} // Cắt ngắn nhãn nếu cần
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={4} /> {/* Sử dụng fill từ dữ liệu */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tăng 5.2% trong tháng này <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Hiển thị tổng đơn hàng trong 6 tháng qua</div>
      </CardFooter>
    </Card>
  );
}
