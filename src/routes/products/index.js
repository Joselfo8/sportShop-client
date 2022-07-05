const router = require("express").Router();
const { newProduct } = require("./function");

router.get("", (req, res) => {
  newProduct("producto1", 1, "descripcion1").then(() => {
    res.send("ya se creo el producto");
  });
});

module.exports = { products: router };
