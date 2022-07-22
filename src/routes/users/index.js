const router = require("express").Router();
const {
  getUser,
  postUser,
  deleteUser,
  putUser,
  loginUser,
  getAllUser,
  logOut,
} = require("./functions");
const { checkRole } = require("../../helpers/auth"); //garantiza una secion iniciada
const { checkRules } = require("../../helpers/Token");

router.get("", getAllUser);
router.post("", postUser);
router.put("/:id", putUser);

router.post("/login", loginUser);

router.get("/:id", checkRole, checkRules(["user", "admin", "ghost"]), getUser); // con checkRoleUser(['user']) ademas de tenee acceso a una secion tenga ahora el role de usuario
router.delete("/:id", deleteUser);
router.post("/logout", logOut);
module.exports = { users: router };
