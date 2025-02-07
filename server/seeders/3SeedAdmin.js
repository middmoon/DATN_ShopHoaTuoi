"use strict";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { User, Role, UserRole } = require("../models"); // Adjust the path to your models if necessary

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

    const hashedPassword = await bcrypt.hash("admin", saltRounds);

    const adminUser = await User.create({
      username: "admin",
      password: hashedPassword,
      name: "Admin System",
      email: "admin@example.com",
    });

    const adminRole = await Role.findOne({ where: { name: "sys_admin" } });

    if (!adminRole) {
      throw new Error("sys_admin role not found. Please ensure the 'sys_admin' role exists in the roles table.");
    }

    // Insert the user role for the admin user
    const addRole = await UserRole.create({
      user_id: adminUser._id,
      role_id: adminRole._id,
    });

    if (!addRole) {
      throw new Error("Failed to add admin user role.");
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    const adminUser = await User.findOne({ where: { username: "admin" } });

    if (adminUser) {
      await UserRole.destroy({ where: { user_id: adminUser._id } });
      await User.destroy({ where: { username: "admin" } });
    }
  },
};
