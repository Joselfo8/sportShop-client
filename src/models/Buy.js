const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "buy",
    {
      date: {
        type: DataTypes.DATE,
        defaultValue: new Date().toISOString(),
      },
    },
    {
      timestamps: false,
    }
  );
};
