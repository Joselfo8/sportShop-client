const router = require("express").Router();
const {
  getCheckAdmin,
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


//router.get("", getAllUser);
router.post("", postUser);
router.get("/token",checkRole,checkRules(["admin"]), getCheckAdmin);
router.post("/login", loginUser);

router.put("/:id",checkRole,   checkRules(["user", "admin"]),putUser);
router.get("",checkRole, checkRules(["user", "admin"]), getAllUser);

router.get("/:id",  checkRole,   checkRules(["user", "admin", "ghost"]), getUser); // con checkRoleUser(['user']) ademas de tenee acceso a una secion tenga ahora el role de usuario
router.delete("/:id",checkRole,checkRules(["user", "admin"]), deleteUser);


router.post("/:logout", logOut);

module.exports = { users: router };
