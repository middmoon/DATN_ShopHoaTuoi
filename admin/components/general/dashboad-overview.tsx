"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api, logapi } from "@/utils/api";

const getTotalOrders = async () => {
  const response = await api.get("/order/count");

  if (response.status !== 200) {
    throw new Error("Can not get total orders");
  }

  return response.data.data;
};

const getTotalRevenue = async () => {
  const response = await api.get("/business/total-revenue");

  if (response.status !== 200) {
    throw new Error("Can not get total orders");
  }

  return response.data.data;
};

const getTotalVisits = async () => {
  const response = await logapi.get("/audit-logs/count");

  if (response.status !== 200) {
    throw new Error("Can not get total orders");
  }

  return response.data.data;
};

export default function DashboardOverview() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const totalOrders = await getTotalOrders();
      const totalRevenue = await getTotalRevenue();
      const totalVisits = await getTotalVisits();

      setTotalOrders(totalOrders);
      setTotalRevenue(totalRevenue);
      setTotalVisits(totalVisits);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-10">
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-500">Tổng đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-500">Tổng doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{totalRevenue.toLocaleString()} VND</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-500">Lượng truy cập</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{totalVisits}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
