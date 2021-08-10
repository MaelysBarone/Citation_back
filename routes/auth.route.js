/** @format */

const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controllers");

router.post("/auth/signup", auth.signUp);
router.post("/auth/signin", auth.signIn);

module.exports = router;