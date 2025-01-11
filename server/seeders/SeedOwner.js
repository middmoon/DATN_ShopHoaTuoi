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

    const hashedPassword = await bcrypt.hash("boss", saltRounds);

    const bossUser = await User.create({
      username: "boss",
      password: hashedPassword,
      name: "Boss",
      email: "boss@example.com",
    });

    const ownerRole = await Role.findOne({ where: { name: "owner" } });

    if (!ownerRole) {
      throw new Error("owner role not found. Please ensure the 'owner' role exists in the roles table.");
    }

    // Insert the user role for the admin user
    const addRole = await UserRole.create({
      user_id: bossUser._id,
      role_id: ownerRole._id,
    });

    if (!addRole) {
      throw new Error("Failed to add boss user role.");
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    const adminUser = await User.findOne({ where: { username: "boss" } });

    if (adminUser) {
      await UserRole.destroy({ where: { user_id: adminUser._id } });
      await User.destroy({ where: { username: "boss" } });
    }
  },
};
