const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmailotp } = require("../utils/sendmailotp");
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

exports.sendmail = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return next(new ErrorHandler("User not found", 404));
    sendmailotp(user, res);
});

exports.verifyotp = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
        .select("+password")
        .exec();
    if (user.otp == req.body.otp) {
        user.password = req.body.password;
        user.otp = "";
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        });
    } else {
        return next(new ErrorHandler("Invalid OTP", 500));
    }
});

exports.resetpassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id).select("+password").exec();
    if (!user) return next(new ErrorHandler("User not found", 404));

    const isMatch = user.comparepassword(req.body.oldpassword);
    if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500));

    user.password = req.body.newpassword;
    await user.save();

    sendToken(user, res, 200);
});

exports.updateuser = catchAsyncErrors(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "User Successfully Updated",
    });
});
