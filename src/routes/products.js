const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("aqui iran productos");
});

module.exports = { products: router };
