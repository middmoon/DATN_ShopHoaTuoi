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
      "roles",
      [
        {
          _id: 1,
          name: "owner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 2,
          name: "sys_admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 3,
          name: "employee",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 4,
          name: "customer",
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
