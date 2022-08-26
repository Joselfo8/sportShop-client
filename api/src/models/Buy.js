const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "buy",
    {
      delivery_number:{
        type: DataTypes.STRING,
        defaultValue: "",
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: new Date().toISOString(),
      },
      status_history: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      sub_total: {
        type: DataTypes.FLOAT,
      },
      send_cost: {
        type: DataTypes.FLOAT,
        defaultValue: 9,
      },
      taxes: {
        type: DataTypes.FLOAT,
      },
      method: {
        type: DataTypes.STRING,
      },
      receiver: {
        type: DataTypes.STRING,
      },
      direction: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
