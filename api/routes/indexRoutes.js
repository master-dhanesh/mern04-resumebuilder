const express = require("express");
const router = express.Router();
const {
    homepage,
    createuser,
    signinuser,
    signoutuser,
    sendmail,
    verifyotp,
    resetpassword,
    updateuser,
    updateavatar,
    createresume,
    readresumes,
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

// @api - post /send-mail
router.post("/send-mail", sendmail);

// @api - post /verify-otp // forgetpassword
router.post("/verify-otp", verifyotp);

// @api - post /reset-password/:id
router.post("/reset-password/:id", isAuthorizedUser, resetpassword);

// @api - post /update-user/:id
router.post("/update-user/:id", isAuthorizedUser, updateuser);

// @api - post /avatar/:id
router.post("/avatar/:id", isAuthorizedUser, updateavatar);

// --------------------------------------------------------------------

// @api - post /resume/create/:userid
router.post("/resume/create/:id", isAuthorizedUser, createresume);

// @api - post /resume/readall/:userid
router.post("/resume/readall/", isAuthorizedUser, readresumes);

module.exports = router;
