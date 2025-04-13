import { io, Socket } from "socket.io-client";

interface OrderCountData {
  count: number;
}

let socket: Socket | undefined;

export const initSocket = (): Socket => {
  if (socket) return socket;

  socket = io("http://localhost:3000/auth", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server (auth namespace)");
  });

  socket.on("orderCount", (data: OrderCountData) => {
    console.log("Order count updated:", data.count);
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
