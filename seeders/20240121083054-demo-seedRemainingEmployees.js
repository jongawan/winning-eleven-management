'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    const data = require("../data/employees.json");
    data.map(el=>{
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
      return el;
    })
    await queryInterface.bulkInsert("Employees", data)
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete("Employees")
  
  }
};
