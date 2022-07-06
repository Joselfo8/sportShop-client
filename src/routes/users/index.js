const router = require("express").Router();
const { getUser, postUser, deleteUser } = require("./functions");

router.get("", (req, res) => {
  getUser(req.query.id_user)
    .then((x) => res.status(200).json(x))
    .catch((x) => res.status(500).json({ err: x }));
});

router.post("", (req, res) => {
  postUser(req.body.name)
    .then((x) => res.status(200).json(x))
    .catch((x) => res.status(500).json({ err: x }));
});

router.delete("", (req, res) => {
  deleteUser(req.query.id_user)
    .then((x) => res.status(200).json(x))
    .catch((x) => res.status(500).json({ err: x }));
});

router.put("", (req, res) => {
  res.send("Carry Put");
});

module.exports = { users: router };
