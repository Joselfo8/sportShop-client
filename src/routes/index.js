const { Router } = require("express");
// Importar todos los routers;
const {shopping_list} = require("./shopping_list");

const { products } = require("./products");

const { users } = require("./users");

const { auth } = require("./auth");

const router = Router();

//healthckeck para el rollaback heroku
router.get("/health", (req, res) => {
  res.json({ msg: "OK" });
});

// Configurar los routers

router.use("/users", users);
router.use("/products", products);
router.use("/shopping_list", shopping_list);
router.use("/auth", auth);

module.exports = router;
