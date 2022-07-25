const router = require("express").Router();

const { checkRole } = require("../../helpers/auth"); //garantiza una secion iniciada
const { checkRules } = require("../../helpers/Token");


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
