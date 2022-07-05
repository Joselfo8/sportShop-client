const router = require("express").Router();
const { newProduct } = require("../handleDB");

router.get("/", (req, res) => {
  newProduct("Pizza", 10, "Pizza de queso").then((x) =>
    res.send("aqui iran productos")
  );
});

module.exports = { products: router };
