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

router.get("", checkRole, checkRules(["admin"]), getBuys);
router.get("/user", checkRole, checkRules(["admin"]), getBuyByUser);
router.get("/:id", checkRole, checkRules(["user", "admin"]), getBuyById);
router.post("", checkRole, checkRules(["user", "admin"]), postBuy);

router.put("", putBuy);
module.exports = { buys: router };
