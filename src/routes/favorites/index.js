const router = require("express").Router();
const {
  getFavoritesById,
  addToFavorites,
  deleteById,
  deleteAllById,
} = require("./function");

//reciben por body
router.post("/", addToFavorites);
router.delete("/", deleteById);
router.delete("/all", deleteAllById);

//recivbe por params
router.get("/:id", getFavoritesById);

module.exports = { favorites: router };
