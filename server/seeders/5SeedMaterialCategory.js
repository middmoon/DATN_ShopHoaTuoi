"use strict";

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

    await queryInterface.bulkInsert(
      "material_categories",
      [
        {
          name: "Hoa Tươi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Hồng",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Cúc",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Ly",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Lan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Baby",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Hướng Dương",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Tulip",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Cẩm Tú Cầu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Lavender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Lụa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hoa Khô",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dụng Cụ Chăm Sóc Hoa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kéo Cắt Tỉa Cành",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bình Tưới Nước",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dung Dịch Dưỡng Hoa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Miếng Xốp Cắm Hoa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Keo Dán Cành Hoa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dụng Cụ Trang Trí",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Giấy Gói Hoa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lưới Gói Hoa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ruy Băng",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hộp Hoa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Giỏ Hoa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bình Hoa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Đèn LED Mini Trang Trí",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  // async down(queryInterface, Sequelize) {
  //   /**
  //    * Add commands to revert seed here.
  //    *
  //    * Example:
  //    * await queryInterface.bulkDelete('People', null, {});
  //    */

  //   await queryInterface.bulkDelete("roles", null, {});
  // },

  async down(queryInterface, Sequelize) {
    // Xóa toàn bộ dữ liệu đã seed
    await queryInterface.bulkDelete("roles", null, {});
  },
};
