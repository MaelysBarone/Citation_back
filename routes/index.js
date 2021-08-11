/** @format */

const express = require("express");
const authApi = require("./auth.route");
const quoteApi = require("./quote.route");
const router = express.Router();

router.use(authApi);
router.use(quoteApi);

module.exports = router;
