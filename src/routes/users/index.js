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


router.get("", getAllUser);

// get user data with id from token
router.get(
  "/data",
  checkRole,
  checkRules(["user", "admin", "ghost"]),
  getUserData
);
// update user
router.put("/:id",checkRole,   checkRules(["user", "admin"]),putUser);
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



//funciones globales
router.post("", postUser);
router.post("/login", loginUser);


router.get("/:id", checkRole, checkRules(["user", "admin", "ghost"]), getUser); // con checkRoleUser(['user']) ademas de tenee acceso a una secion tenga ahora el role de usuario
router.delete(
  "/:id",
  checkRole,
  checkRules(["user", "admin", "ghost"]),
  deleteUser
);


module.exports = { users: router };
