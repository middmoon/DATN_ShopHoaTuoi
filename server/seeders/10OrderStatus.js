"use strict";

const slugify = require("slugify");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("order_statuses", [
      { _id: 1, name: "Chờ xác nhận", description: "Đơn hàng đang chờ xác nhận" },
      { _id: 2, name: "Đang xử lý", description: "Đơn hàng đang được chuẩn bị" },
      { _id: 3, name: "Đang giao hàng", description: "Shipper đang giao đơn hàng" },
      { _id: 4, name: "Hoàn thành", description: "Đơn hàng đã được giao thành công" },
      { _id: 5, name: "Đơn bị hủy", description: "Đơn hàng đã bị hủy" },
      { _id: 6, name: "Đơn bị hoàn", description: "Khách hàng trả lại hàng" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("material_attributes", null, {});
  },
};
