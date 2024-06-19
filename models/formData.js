module.exports = (sequelize, DataTypes) => {
  const formdata = sequelize.define("formdata", {
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    domicile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    additionalQualification: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  formdata.associate = (models) => {
    formdata.belongsTo(models.users, {
      foreignKey: "userId", // Foreign key in theformdata table
      onDelete: "CASCADE",
    });
  };

  return formdata;
};
