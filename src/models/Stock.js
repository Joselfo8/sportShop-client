const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Inventary",
    {
      size: {
        type: DataTypes.STRING,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      
    },
    {
      timestamps: false,
    }
  );
};
