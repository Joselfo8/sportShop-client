const express = require('express');
const router = express.Router();

const {loginCtrl,registrCtrl} = require('../controllers/authenticator');
//login!
router.post('/login',loginCtrl)

//Register the user!
router.post('/register',registrCtrl)

module.exports = router;