const express = require("express");
const router = express.Router();
const {
    homepage,
    createuser,
    signinuser,
    signoutuser,
} = require("../controllers/indexControllers");
const { isAuthorizedUser } = require("../middleware/auth");

// @api - get /
router.get("/", isAuthorizedUser, homepage);

// @api - post /signup
router.post("/signup", createuser);

// @api - post /signin
router.post("/signin", signinuser);

// @api - get /signout
router.get("/signout", signoutuser);

module.exports = router;
