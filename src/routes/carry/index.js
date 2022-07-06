const { Router } = require("express");
const { getCarry } = require("./functions");

const router = require("express").Router();

router.get("", (req, res) => {
  getCarry(req.query.id_user)
    .then((x) => res.status(200).json(x))
    .catch((x) => res.status(500).json({ err: x }));
});

router.post("", (req, res) => {});

router.delete("", (req, res) => {
  res.send("Carry Delete");
});

router.put("", (req, res) => {
  res.send("Carry Put");
});

module.exports = { carry: router };
