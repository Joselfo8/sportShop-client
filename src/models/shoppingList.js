const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "shoppingList",
    {
      listProduct: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },

    {
      timestamps: false,
    }
  );
};
