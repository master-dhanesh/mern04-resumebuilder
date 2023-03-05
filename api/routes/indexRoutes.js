const express = require("express");
const router = express.Router();
const { homepage, createuser } = require("../controllers/indexControllers");

// @api - get /
router.get("/", homepage);

// @api - post /createuser
router.post("/createuser", createuser);

module.exports = router;
