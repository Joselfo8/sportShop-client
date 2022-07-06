const { Router } = require("express");
const { getCarry, postCarry, newUser } = require("./functions");

const router = require("express").Router();

router.get("/user", (req, res) => {
  newUser(req.query.name)
    .then((x) => res.status(200).json(x))
    .catch((x) => res.status(500).json({ err: x }));
});
router.get("", (req, res) => {
  getCarry(req.query.id_user)
    .then((x) => res.status(200).json(x))
    .catch((x) => res.status(500).json({ err: x }));
});

router.post("", (req, res) => {
  postCarry(req.body.id_user, req.body.id_product, req.body.quantity)
    .then((x) => res.status(200).json(x))
    .catch((x) => res.status(500).json({ err: x }));
});

router.delete("", (req, res) => {
  res.send("Carry Delete");
});

router.put("", (req, res) => {
  res.send("Carry Put");
});

module.exports = { carry: router };
