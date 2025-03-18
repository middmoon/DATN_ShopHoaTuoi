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

    await queryInterface.bulkInsert("payment_methods", [
      { _id: 1, name: "VNPay" },
      { _id: 2, name: "Momo" },
      { _id: 3, name: "ZaloPay" },
      { _id: 4, name: "Tiền mặt" },
      { _id: 5, name: "Thẻ tín dụng" },
      { _id: 6, name: "Chuyển khoản ngân hàng" },
      { _id: 7, name: "Thanh toán khi nhận hàng (COD)" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("material_attributes", null, {});
  },
};
