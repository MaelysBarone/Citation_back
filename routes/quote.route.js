/** @format */

const express = require("express");
const router = express.Router();
const quote = require("../controllers/quotes.controllers");

router.get("/quotes", quote.findAll);
router.post("/quote/create", quote.create);
router.delete("/quote/delete/:id", quote.delete);
router.put("/quote/update/:id", quote.update);


module.exports = router;