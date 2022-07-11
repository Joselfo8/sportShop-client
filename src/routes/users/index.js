const router = require("express").Router();
const {
  getUser,
  postUser,
  deleteUser,
  putUser,
  loginUser,
} = require("./functions");

router.get("/:id", (req, res) => {
  getUser(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((x) => res.status(500).json({ err: x }));
});

router.post("", postUser);
router.put("", putUser);

router.delete("", (req, res) => {
  deleteUser(req.query.id_user)
    .then((x) => res.status(200).json(x))
    .catch((x) => res.status(500).json({ err: x }));
});

router.get("/login", (req, res) => {
  loginUser(req.query.username, req.query.password)
    .then((x) => res.status(200).json(x))
    .catch((x) => res.status(500).json({ err: x }));
});

module.exports = { users: router };
