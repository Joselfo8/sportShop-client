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

//funciones globales
router.post(
  "/login",
  checkRole,
  checkRules(["user", "admin", "guest"]),
  loginUser
);
router.get(
  "/isAdmin",
  checkRole,
  checkRules(["user", "admin", "guest"]),
  getCheckAdmin
);

router.get("/all", checkRole, checkRules(["admin"]), getAllUser);

// get user data with id from token
router.get("", checkRole, checkRules(["user", "admin"]), getUserData);
router.get("/:id", checkRole, checkRules(["admin"]), getUserData);
// update self-user data
router.put("", checkRole, checkRules(["user", "admin"]), putUser);
router.put("/:id", checkRole, checkRules(["admin"]), putUser);
// delete user
router.delete("", checkRole, checkRules(["user", "admin"]), deleteUser);
router.delete("/:id", checkRole, checkRules(["admin"]), deleteUser);
// create a new user
router.post("", postUser);
// create, update, and delete a shipping address
router.post(
  "/address",
  checkRole,
  checkRules(["user", "admin"]),
  addShippingAddress
);
router.put(
  "/address/:id",
  checkRole,
  checkRules(["user", "admin"]),
  updateShippingAddress
);
router.delete(
  "/address/:id",
  checkRole,
  checkRules(["user", "admin"]),
  deleteShippingAddress
);

module.exports = { users: router };
