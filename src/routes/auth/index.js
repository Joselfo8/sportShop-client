const express = require('express');
const router = require("express").Router();
const passport = require("passport");

const {registerCtrl} = require('./functions');
//login!
//router.post('/login',loginCtrl)
//Register the user!
router.post('/',registerCtrl)
//
//google auth

//const { tokenSign } = require("../../helpers/Token");
//const { User } = require("../../db");
//require("../../midleware.js");
//const passport = require("passport");

const CLIENT_URL = "http://localhost:4040/"//"https://sport-shop-client.vercel.app/"//"http://localhost:4040/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user._json.email,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});


/// igual para todos los routers
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/cb",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
)
;//google auth



module.exports = {auth:router};