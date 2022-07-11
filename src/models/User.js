const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { arg: true, msg: "the name must not be empty" },
          is: { arg: /^\S/, msg: "the name must not start with blank spaces" },
          is: { arg: /^[a-zA-Z0-9-_]*$/, msg: "The title can only contain letters, numbers, hyphens and underscores" },
          len: { args: [1, 50], msg: "title must be between 1-50 characters" },

        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { arg: true, msg: "the email must not be empty" },
          is: { arg: /^\S/, msg: "the email must not start with blank spaces" },
          isEmail: { arg: true, msg: "the email must be a valid email" },
        
        }
      }
    },
    {
      timestamps: false,
    }
  );
};
