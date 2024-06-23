"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("formdata", "age");
    await queryInterface.removeColumn("formdata", "domicile");
    await queryInterface.removeColumn("formdata", "qualification");
    await queryInterface.removeColumn("formdata", "additionalQualification");
    await queryInterface.addColumn("formdata", "filePath", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("formdata", "age", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("formdata", "domicile", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("formdata", "qualification", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("formdata", "additionalQualification", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.removeColumn("formdata", "filePath");
  },
};
