const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthorizedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return next(
            new ErrorHandler("Please login to access the resource", 500)
        );
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    req.user = await User.findById(id).exec();
    next();
});
