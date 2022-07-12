const router = require("express").Router();
const {
  getUser,
  postUser,
  deleteUser,
  putUser,
  loginUser,
} = require("./functions");

router.post("", postUser);
router.put("", putUser);

router.get("/login", loginUser);

router.delete("/:id", deleteUser);
router.get("/:id", getUser);

module.exports = { users: router };
