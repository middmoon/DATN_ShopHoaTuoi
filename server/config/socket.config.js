"use strict";
require("dotenv").config();
const { Server } = require("socket.io");
const { authCookieMiddleware } = require("../middlewares/socket-auth.middleware");
const countOrderEvent = require("../socket/order_count.socket");

module.exports = (server) => {
  console.log("Socket.IO server initializing...");
  const io = new Server(server, {
    cors: {
      origin: [`http://localhost:${process.env.ADMIN_PORT}`],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("publicEvent", (data) => {
      console.log("Public event received:", data);
      socket.emit("publicResponse", { message: "This is a public response" });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  const authNamespace = io.of("/auth").use(authCookieMiddleware);

  authNamespace.on("connection", (socket) => {
    console.log("Client connected to /auth namespace:", socket.id);

    // Tích hợp countOrderEvent
    countOrderEvent(socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected from /auth namespace:", socket.id);
    });
  });

  return io;
};
