const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

exports.homepage = (req, res, next) => {
    res.json({ message: "This is homepage" });
};

exports.createuser = catchAsyncErrors(async (req, res, next) => {
    const user = await new User(req.body).save();
    res.json(user);
});
