"use client";

import { Area, AreaChart, Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function DashboardCharts() {
  // Revenue by month data
  const barData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 7000 },
  ];

  // Weekly users data
  const lineData = [
    { name: "Week 1", users: 100 },
    { name: "Week 2", users: 200 },
    { name: "Week 3", users: 300 },
    { name: "Week 4", users: 250 },
  ];

  // Product distribution data
  const pieData = [
    { name: "Product A", value: 40 },
    { name: "Product B", value: 200 },
    { name: "Product C", value: 20 },
    { name: "Product D", value: 10 },
  ];

  // Quarterly profit data
  const areaData = [
    { name: "Q1", profit: 5000 },
    { name: "Q2", profit: 0 },
    { name: "Q3", profit: 0 },
    { name: "Q4", profit: 0 },
  ];

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Revenue by month - Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Doanh thu theo tháng</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Doanh thu",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="min-h-[300px]"
          >
            <BarChart
              accessibilityLayer
              data={barData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Users by week - Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Lượng người dùng theo tuần</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              users: {
                label: "Người dùng",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="min-h-[300px]"
          >
            <LineChart
              accessibilityLayer
              data={lineData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Product distribution - Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tỷ lệ sản phẩm bán ra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between min-h-[300px]">
            <div className="w-full md:w-2/3">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}`, "Value"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/3 flex flex-col space-y-3 mt-4 md:mt-0">
              {pieData.map((entry, index) => {
                const percentage = Math.round((entry.value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100);
                return (
                  <div key={`legend-${index}`} className="flex flex-col">
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="font-medium">{entry.name}</span>
                    </div>
                    <div className="ml-5 text-sm text-muted-foreground">
                      <span>
                        {entry.value} ({percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quarterly profit - Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Lợi nhuận theo quý</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              profit: {
                label: "Lợi nhuận",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="min-h-[300px]"
          >
            <AreaChart
              accessibilityLayer
              data={areaData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="profit" stroke="var(--color-profit)" fill="var(--color-profit)" fillOpacity={0.3} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
