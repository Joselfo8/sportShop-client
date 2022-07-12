const router = require("express").Router();
const { getBuys } = require("./functions");

router.get("", getBuys);
module.exports = { buys: router };
