module.exports = (sequelize, DataTypes) => {
  const formdata = sequelize.define("formdata", {
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  formdata.associate = (models) => {
    formdata.belongsTo(models.users, {
      foreignKey: "userId", // Foreign key in the formdata table
      onDelete: "CASCADE",
    });
  };

  return formdata;
};
