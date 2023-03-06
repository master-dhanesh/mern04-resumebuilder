const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendtoken");

exports.homepage = (req, res, next) => {
    res.json({ message: "This is homepage", user: req.user });
};

exports.createuser = catchAsyncErrors(async (req, res, next) => {
    const user = await new User(req.body).save();

    sendToken(user, res, 201);
});

exports.signinuser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
        .select("+password")
        .exec();
    if (!user) return next(new ErrorHandler("User not found", 404));

    const isMatch = user.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500));

    sendToken(user, res, 200);
});

exports.signoutuser = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully Logged Out!" });
});
