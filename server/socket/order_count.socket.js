"use strict";

const OrderService = require("../services/order.service");

const countOrderEvent = (socket) => {
  socket.on("countOrder", async () => {
    try {
      const pendingOrdersCount = await OrderService.getPendingOrdersCount();
      socket.emit("orderCount", pendingOrdersCount);
    } catch (error) {
      console.error("Error counting orders:", error);
      socket.emit("orderCountError", { message: "Failed to count orders" });
    }
  });
};

module.exports = countOrderEvent;
