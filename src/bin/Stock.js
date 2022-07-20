/* const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "stock",
    {
      size: {
        type: DataTypes.STRING,
        allowNull: false,
        defoultValue: "",
        /* validate: {
          is: { arg: /^\S/, msg: "The size must not start with blank spaces" },
          /* is: {
            arg: /^[a-zA-Z0-9-_]*$/,
            msg: "The size can only contain letters, numbers, hyphens and underscores",
          },
        }, 
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
         validate: {
          isNumeric: { args: true, msg: "cantidad must be numerico positivo" },
           is: {
            arg: /^\S/,
            msg: "The cantidad must not start with blank spaces",
          },
        }, 
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: { args: true, msg: "item_id must be numerico positivo" },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
 */