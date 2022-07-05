const router = require("express").Router();
const { newProduct } = require("../handleDB");

router.get("/", (req, res) => {
  res.send("aqui iran productos");
});

module.exports = { products: router };
