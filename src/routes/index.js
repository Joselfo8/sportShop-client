const { Router } = require("express");
// Importar todos los routers;

const { products } = require("./products");
const { users } = require("./users");

const { shopping_list } = require("./shopping_list");
const { favorites } = require("./favorites");

const { auth } = require("./auth");

const { buys } = require("./buys");

const router = Router();

//healthckeck para el rollaback heroku
router.get("/health", (req, res) => {
  res.json({ msg: "OK" });
});

// Configurar los routers

router.use("/users", users);
router.use("/products", products);
router.use("/shopping_list", shopping_list);
router.use("/favorites", favorites);

router.use("/auth", auth);

router.use("/buys", buys);

module.exports = router;
