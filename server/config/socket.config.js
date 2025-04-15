"use strict";
require("dotenv").config();
const { Server } = require("socket.io");
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

    countOrderEvent(socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};
