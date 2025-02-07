"use strict";

const { ProductCategory } = require("../models");

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

    const categories = [
      {
        name: "Đối Tượng",
        submenu: [
          "Hoa Tặng Mẹ",
          "Hoa Tặng Ba",
          "Hoa Tặng Vợ",
          "Hoa Tặng Chồng",
          "Hoa Tặng Người Yêu",
          "Hoa Tặng Bạn Bè",
          "Hoa Tặng Đồng Nghiệp",
          "Hoa Tặng Sếp",
        ],
      },
      {
        name: "Kiểu Dáng",
        submenu: [
          "Bó Hoa Tươi",
          "Giỏ Hoa Tươi",
          "Hộp Hoa Tươi",
          "Bình Hoa Tươi",
          "Hoa Thả Bình",
          "Lãng Hoa Khai Trương",
          "Hoa Chia Buồn",
          "Hộp Mika",
        ],
      },
      {
        name: "Hoa Tươi",
        submenu: [
          "Only Rose",
          "Hoa Hồng",
          "Hoa Hướng Dương",
          "Hoa Đồng Tiền",
          "Lan Hồ Điệp",
          "Cẩm Chướng",
          "Hoa Cát Tường",
          "Hoa Ly",
          "Baby Flower",
          "Hoa Cúc",
          "Sen Đá",
        ],
      },
      {
        name: "Chủ Đề",
        submenu: [
          "Hoa Sinh Nhật",
          "Hoa Khai Trương",
          "Hoa Chúc Mừng",
          "Hoa Chia Buồn",
          "Hoa Chúc Sức Khỏe",
          "Hoa Tình Yêu",
          "Hoa Cảm Ơn",
          "Hoa Mừng Tốt Nghiệp",
          "Hoa Cưới",
        ],
      },
      {
        name: "Màu Sắc",
        submenu: ["Màu Trắng", "Màu Đỏ", "Màu Hồng", "Màu Cam", "Màu Tím", "Màu Vàng", "Xanh Dương", "Kết Hợp Màu", "Xanh Lá"],
      },
      {
        name: "Bộ Sưu Tập",
        submenu: ["Dưỡng Hoa Tươi", "Bình Dưỡng Hoa", "Phụ Kiện Dưỡng Hoa"],
      },
      {
        name: "Chăm Sóc Hoa",
        submenu: ["Dưỡng Hoa Tươi", "Bình Dưỡng Hoa", "Phụ Kiện Dưỡng Hoa"],
      },
    ];

    const categoryInserts = [];
    for (const category of categories) {
      const parent = await queryInterface.bulkInsert("product_categories", [{ name: category.name, createdAt: new Date(), updatedAt: new Date() }], {
        returning: true,
      });

      if (category.submenu) {
        for (const sub of category.submenu) {
          categoryInserts.push({
            name: sub,
            parent_id: parent,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }

    await queryInterface.bulkInsert("product_categories", categoryInserts);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("product_categories", null, {});
  },
};
