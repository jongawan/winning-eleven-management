"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("rahasia", salt);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "manager",
          email: "manager@gmail.com",
          password: hash,
          role: "manager",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "player",
          email: "player@gmail.com",
          password: hash,
          role: "player",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};