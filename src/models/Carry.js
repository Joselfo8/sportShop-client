const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "carry",
    {
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      timestamps: false,
    }
  );
};
