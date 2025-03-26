import { io, Socket } from "socket.io-client";

interface OrderCountData {
  pendingOrdersCount: number;
}

let socket: Socket | undefined;

export const initSocket = (): Socket => {
  if (socket) return socket;

  socket = io(`http://localhost:${process.env.NEXT_PUBLIC_ADMIN_PORT || 3000}`, {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });

  socket.on("orderCount", (data: OrderCountData) => {
    console.log("Order count updated:", data.pendingOrdersCount);
  });

  socket.on("connect_error", (err: Error) => {
    console.error("Connection error:", err.message);
  });

  return socket;
};

export const getSocket = (): Socket | undefined => socket;

export const requestOrderCount = () => {
  const socket = getSocket();
  if (socket) {
    socket.emit("countOrder");
  }
};
