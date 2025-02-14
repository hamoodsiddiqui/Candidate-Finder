// models/users.js
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwords: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      DefaultValue: "candidate",
    },
    qualification: {
      type: DataTypes.STRING,
      DefaultValue: "None",
    },
    additionalQualification: {
      type: DataTypes.STRING,
      DefaultValue: "None",
    },
  });

  // Before creating a new users, hash the password
  users.beforeCreate(async (user) => {
    user.passwords = await bcrypt.hash(user.passwords, 10);
  });

  // Associate users with FormData
  users.associate = (models) => {
    users.hasOne(models.formdata, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return users;
};
