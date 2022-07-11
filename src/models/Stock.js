const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Inventary",
    {
      size: {
        type: DataTypes.STRING,
        validate: {
          is: { arg: /^\S/, msg: "The size must not start with blank spaces" },
          is: { arg: /^[a-zA-Z0-9-_]*$/, msg: "The size can only contain letters, numbers, hyphens and underscores" },     
        }
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
