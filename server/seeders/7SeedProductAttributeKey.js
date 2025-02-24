// "use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//      */

//     await queryInterface.bulkInsert(
//       "material_attributes",
//       [
//         {
//           _id: 1,
//           key: "Màu sắc",
//           value: "Đỏ",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 2,
//           key: "Màu sắc",
//           value: "Vàng",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 3,
//           key: "Màu sắc",
//           value: "Trắng",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 4,
//           key: "Màu sắc",
//           value: "Xanh dương",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 5,
//           key: "Màu sắc",
//           value: "Xanh lá",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 6,
//           key: "Màu sắc",
//           value: "Đen",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 7,
//           key: "Màu sắc",
//           value: "Hồng",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 8,
//           key: "Màu sắc",
//           value: "Tím",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 9,
//           key: "Độ tươi",
//           value: "Tươi",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 10,
//           key: "Độ tươi",
//           value: "Khô",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 11,
//           key: "Hương thơm",
//           value: "Nồng",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 12,
//           key: "Hương thơm",
//           value: "Trung tính",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 13,
//           key: "Hương thơm",
//           value: "Nhẹ nhàng",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 14,
//           key: "Kích thước",
//           value: "Nhỏ",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 15,
//           key: "Kích thước",
//           value: "Trung bình",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 16,
//           key: "Kích thước",
//           value: "Lớn",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 17,
//           key: "Thời gian tươi",
//           value: "Ngắn ngày",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 18,
//           key: "Thời gian tươi",
//           value: "Dài ngày",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 19,
//           key: "Chất liệu",
//           value: "Hoa tươi",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 20,
//           key: "Chất liệu",
//           value: "Giấy",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 21,
//           key: "Chất liệu",
//           value: "Nhựa",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 22,
//           key: "Chất liệu",
//           value: "Kim loại",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           _id: 23,
//           key: "Chất liệu",
//           value: "Gỗ",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ],
//       {}
//     );
//   },

//   // async down(queryInterface, Sequelize) {
//   //   /**
//   //    * Add commands to revert seed here.
//   //    *
//   //    * Example:
//   //    * await queryInterface.bulkDelete('People', null, {});
//   //    */

//   //   await queryInterface.bulkDelete("roles", null, {});
//   // },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete("material_attributes", null, {});
//   },
// };
