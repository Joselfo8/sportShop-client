const { Router } = require("express");
// Importar todos los routers;
const { products } = require("./products");

const { users } = require("./users");

const router = Router();

//healthckeck para el rollaback heroku
router.get("/health", (req, res) => {
  res.json({ msg: "OK" });
});

// Configurar los routers
router.use("/products", products);

router.use("/users", users);

module.exports = router;
