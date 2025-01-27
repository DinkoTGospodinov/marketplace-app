const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/userController");
const User = require("../models/User");

router.post("/register", register);
router.post("/login", login);
router.get("./profile/:id", profile);

module.exports = router;
