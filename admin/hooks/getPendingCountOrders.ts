// import React, { useEffect, useState, useRef } from "react";
// import { api } from "@/utils/api";

// const useGetPendingOrdersCount = () => {
//   const [pendingOrdersCount, setPendingOrdersCount] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const effectRan = useRef(false);

//   useEffect(() => {
//     if (effectRan.current === false) {
//       const fetchPendingOrders = async () => {
//         try {
//           const response = await api.get("/order/pending", {
//             headers: { "Content-Type": "application/json" },
//             withCredentials: true,
//           });
//           setPendingOrdersCount(response.data.data.pending_orders_count);
//           setLoading(false);
//         } catch (err) {
//           setError("Có lỗi xảy ra khi tải dữ liệu");
//           setLoading(false);
//         }
//       };

//       fetchPendingOrders();

//       return () => {
//         effectRan.current = true;
//       };
//     }
//   }, []);

//   return { pendingOrdersCount, loading, error };
// };

// export default useGetPendingOrdersCount;

//////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";

import { api } from "@/utils/api";

const useGetPendingOrdersCount = () => {
  const [pendingOrdersCount, setPendingOrdersCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await api.get("/order/pending", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setPendingOrdersCount(response.data.data.pending_orders_count);
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu");
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  return { pendingOrdersCount, loading, error };
};

export default useGetPendingOrdersCount;
