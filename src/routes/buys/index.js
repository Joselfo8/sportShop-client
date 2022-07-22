const router = require("express").Router();
const {
  getBuys,
  postBuy,
  putBuy,
  getBuyById,
  getBuyByUser,
} = require("./functions");

router.get("", getBuys);
router.get("/user", getBuyByUser);
router.get("/:id", getBuyById);
router.post("", postBuy);

router.put("", putBuy);
module.exports = { buys: router };
