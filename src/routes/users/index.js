const router = require("express").Router();
const {
  getCheckAdmin,
  getUser,
  getUserData,
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

// get user data with id from token
router.get(
  "/data",
  checkRole,
  checkRules(["user", "admin", "ghost"]),
  getUserData
);
// update user
router.put("/:id", checkRole, checkRules(["user", "admin"]), putUser);
// create a new user
router.post("", postUser);
// create, update, and delete a shipping address
router.post(
  "/address",
  checkRole,
  checkRules(["user", "admin", "ghost"]),
  addShippingAddress
);
router.put(
  "/address/:id",
  checkRole,
  checkRules(["user", "admin", "ghost"]),
  updateShippingAddress
);
router.delete(
  "/address/:id",
  checkRole,
  checkRules(["user", "admin", "ghost"]),
  deleteShippingAddress
);
router.get("", checkRole, checkRules(["admin"]), getAllUser);

//funciones globales
router.post("", postUser);
router.post("/login", loginUser);

router.put("/:id", checkRole, checkRules(["user", "admin"]), putUser);
router.delete("/:id", checkRole, checkRules(["user", "admin"]), deleteUser);

router.get("/:id", checkRole, checkRules(["user", "admin"]), getUser); // con checkRoleUser(['user']) ademas de tenee acceso a una secion tenga ahora el role de usuario

router.post("/:logout", logOut);

module.exports = { users: router };
