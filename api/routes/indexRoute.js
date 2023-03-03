const express = require("express");
const router = express.Router();
const { homepage, create } = require("../controllers/indexControllers");

// GET /
router.get("/", homepage);

// POST /create
router.post("/create/", create);

module.exports = router;
