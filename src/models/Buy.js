const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Inventary",
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
