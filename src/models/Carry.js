const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "carry",
    {
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      timestamps: false,
    }
  );
};
