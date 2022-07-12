const router = require("express").Router();
const {
  getUser,
  postUser,
  deleteUser,
  putUser,
  loginUser,
} = require("./functions");
const {checkPermission,}= require ('../../helpers/auth');//garantiza una secion iniciada
const {checkRoleUser}= require('../../helpers/Token')


router.post("", postUser);
router.put("", putUser);

router.delete("", deleteUser);

router.post("/login", loginUser);// sorry but it most be a post not a get

router.get("/:id",checkPermission  , checkRoleUser(['user']) , getUser); // con checkRoleUser(['user']) ademas de tenee acceso a una secion tenga ahora el role de usuario

module.exports = { users: router };
