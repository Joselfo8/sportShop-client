const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        isIn: {
          args: [["user", "admin"]],
          msg: "Must be user or admin",
        },
      }, //user or admin
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { arg: true, msg: "the name must not be empty" },
          is: { arg: /^\S/, msg: "the name must not start with blank spaces" },
          is: {
            arg: /^[a-zA-Z0-9-_]*$/,
            msg: "The title can only contain letters, numbers, hyphens and underscores",
          },
          len: { args: [1, 50], msg: "title must be between 1-50 characters" },
        },
      },

      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        isUnique: { arg: true, msg: "the email is already in use" },
        allowNull: false,
        validate: {
          notEmpty: { arg: true, msg: "the email must not be empty" },
          is: { arg: /^\S/, msg: "the email must not start with blank spaces" },
          isEmail: { arg: true, msg: "the email must be a valid email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      direction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      timestamps: false,
    }
  );
};
