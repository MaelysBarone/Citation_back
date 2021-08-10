/** @format */

const express = require("express");
const authApi = require("./auth.route");

const router = express.Router();

router.use(authApi);
module.exports = router;
