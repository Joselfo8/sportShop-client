const router = require("express").Router();
const { getBuys, postBuy, putBuy } = require("./functions");

router.get("", getBuys);

router.post("", postBuy);

router.put("", putBuy);
module.exports = { buys: router };
