const express = require('express');
const router = express.Router();
const API = require('../controllers/Usuario');

router.post("/register", API.register);
router.post("/login", API.login);
router.get("/logout", API.logout);

module.exports = router;