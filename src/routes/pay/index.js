const router = require("express").Router();
const { checkRole } = require("../../helpers/auth"); //garantiza una secion iniciada
const { checkRules } = require("../../helpers/Token");

const {postPay} = require("./functions")
router.post("",checkRole,checkRules(["user", "admin"]),postPay)

module.exports = {pay: router}