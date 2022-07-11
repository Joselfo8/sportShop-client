const express = require('express');
const router = express.Router();

const {loginCtrl,registerCtrl} = require('./functions');
//login!
//router.post('/login',loginCtrl)

//Register the user!
router.post('/',registerCtrl)

module.exports = {auth:router};