// models/formData.js

module.exports = (sequelize, DataTypes) => {
    const formData = sequelize.define('formData', {
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      qualification: {
        type: DataTypes.STRING,
        allowNull: false
      },
      additionalQualification: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
     
    return formData;
  };
  