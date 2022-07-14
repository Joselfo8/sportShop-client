const router = require("express").Router();
const {postPay} = require("./functions")
router.post("",postPay)

module.exports = {pay: router}