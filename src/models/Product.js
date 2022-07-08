const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        //allowNull:false,
      },
      subCategory: {
        type: DataTypes.STRING,
      },
      product_care: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://ae01.alicdn.com/kf/HTB19SdxKpXXXXctXXXXq6xXFXXXc/404-folla-Not-Found-T-Shirt-blanco-y-negro-la-ropa-de-moda-t-mujeres-y.jpg_Q90.jpg_.webp",
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rating_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
