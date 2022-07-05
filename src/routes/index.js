const { Router } = require("express");
// Importar todos los routers;
const products = require("./products");

const router = Router();

// Configurar los routers
router.use("/products", products);

module.exports = router;
