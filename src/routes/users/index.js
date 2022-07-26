const router = require("express").Router();
const {
  getUser,
  postUser,
  deleteUser,
  putUser,
  loginUser,
  getAllUser,
  logOut,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} = require("./functions");

const { checkRole } = require("../../helpers/auth"); //garantiza una secion iniciada
const { checkRules } = require("../../helpers/Token");

router.get("", checkRole, checkRules(["admin"]), getAllUser);

//funciones globales
router.post("", postUser);
router.post("/login", loginUser);

router.put("/:id", checkRole, checkRules(["user", "admin"]), putUser);
router.delete("/:id", checkRole, checkRules(["user", "admin"]), deleteUser);

router.get("/:id", checkRole, checkRules(["user", "admin"]), getUser); // con checkRoleUser(['user']) ademas de tenee acceso a una secion tenga ahora el role de usuario

router.post("/logout", logOut);
module.exports = { users: router };
