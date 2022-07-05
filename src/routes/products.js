const products = require("./index");

router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = products;
