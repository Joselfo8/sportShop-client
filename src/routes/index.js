const { Router } = require("express");
// Importar todos los routers;
const { products } = require("./products");

const router = Router();

router.get("/health", (req, res) => {
  res.json({ msg: "OK" });
});
// Configurar los routers
router.use("/products", products);

module.exports = router;
