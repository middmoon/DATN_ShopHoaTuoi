"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Ví dụ dữ liệu cho SearchLog (đã được tổng hợp theo ngày)
const searchLogData = [
  { date: "2025-01-01", searches: 25 },
  { date: "2025-01-02", searches: 40 },
  { date: "2025-01-03", searches: 35 },
  { date: "2025-01-04", searches: 50 },
  { date: "2025-01-05", searches: 45 },
];

// Ví dụ dữ liệu cho AuditLog (đếm số lượt thực hiện của từng hành động)
const auditLogData = [
  { action: "LOGIN", count: 50 },
  { action: "LOGOUT", count: 30 },
  { action: "UPDATE", count: 20 },
  { action: "DELETE", count: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Component biểu đồ cột cho SearchLog
export function SearchLogChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Số lượng tìm kiếm theo ngày</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={searchLogData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="searches" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Component biểu đồ tròn cho AuditLog
export function AuditLogChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân bố hành động của AuditLog</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={auditLogData} dataKey="count" outerRadius={100} label>
              {auditLogData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
