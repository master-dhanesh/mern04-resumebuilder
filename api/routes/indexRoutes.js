const express = require("express");
const router = express.Router();
const { homepage } = require("../controllers/indexControllers");

// @api - get /
router.get("/", homepage);

module.exports = router;
