const { Router } = require("express");
// Importar todos los routers;
const { stock } = require("./stock");
const { products } = require("./products");
const { users } = require("./users");

const { shopping_list } = require("./shopping_list");
const { favorites } = require("./favorites");

const { auth } = require("./auth");

const { buys } = require("./buys");

const { pay } = require("./pay");

const router = Router();

//healthckeck para el rollaback heroku
router.get("/health", (req, res) => {
  res.send("ok");
});

// Configurar los routers

router.use("/users", users);
router.use("/products", products);
router.use("/shopping_list", shopping_list);
router.use("/favorites", favorites);
router.use("/auth", auth);
router.use("/buys", buys);
//router.use("/stock", stock);
router.use("/pay", pay);


module.exports = router;
