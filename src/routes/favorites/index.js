const router = require("express").Router();
const {getFavoritesById, addToFavorites, deleteById} = require("./function")

router.get("/:id", getFavoritesById);
router.post("/", addToFavorites);
router.delete("", deleteById);

module.exports = {favorites:router}