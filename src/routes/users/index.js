const router = require("express").Router();
const {
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
router.post("", postUser);
router.put("/:id", putUser);
// create, update, and delete a shipping address
router.post("/:id/address", addShippingAddress);
router.put("/address/:id", updateShippingAddress);
router.delete("/address/:id", deleteShippingAddress);

router.post("/login", loginUser);

router.get("/:id", checkRole, checkRules(["user", "admin", "ghost"]), getUser); // con checkRoleUser(['user']) ademas de tenee acceso a una secion tenga ahora el role de usuario
router.delete("/:id", deleteUser);
router.post("/logout", logOut);
module.exports = { users: router };
