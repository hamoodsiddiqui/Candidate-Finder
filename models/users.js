// models/user.js

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    return users;
  };
  