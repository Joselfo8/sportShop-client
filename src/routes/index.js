const { Router } = require("express");
// Importar todos los routers;
const { products } = require("./products");

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});
// Configurar los routers
router.use("/products", products);

module.exports = router;
