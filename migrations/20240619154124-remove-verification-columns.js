"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "verified");
    await queryInterface.removeColumn("Users", "confirmationToken");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "verified", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("Users", "confirmationToken", {
      type: Sequelize.STRING,
      unique: true,
    });
  },
};
