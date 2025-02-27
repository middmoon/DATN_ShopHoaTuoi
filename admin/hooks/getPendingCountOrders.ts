import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";

const useGetPendingOrdersCount = () => {
  const [pendingOrdersCount, setPendingOrdersCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPendingOrders = async () => {
      try {
        const response = await api.get("/order/pending-orders-count", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (isMounted) {
          setPendingOrdersCount(response.data.data.pending_orders_count);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("Có lỗi xảy ra khi tải dữ liệu");
          setLoading(false);
        }
      }
    };

    // Gọi lần đầu tiên
    fetchPendingOrders();

    // Thiết lập polling mỗi 5 giây
    // const intervalId = setInterval(fetchPendingOrders, 5000);

    return () => {
      isMounted = false;
      // clearInterval(intervalId);
    };
  }, []);

  return { pendingOrdersCount, loading, error };
};

export default useGetPendingOrdersCount;
