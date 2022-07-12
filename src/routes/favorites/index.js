const router = require("express").Router();
const { getFavoritesById, addToFavorites, deleteById } = require("./function");

router.post("/", addToFavorites);
router.delete("", deleteById);
router.delete("/all", deleteById);
router.get("/:id", getFavoritesById);

module.exports = { favorites: router };
