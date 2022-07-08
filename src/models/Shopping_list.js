const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "shopping_list",
    {
      product_list: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },

    {
      timestamps: false,
    }
  );
};
