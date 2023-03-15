exports.sendToken = (user, res, statusCode) => {
    const token = user.jwttoken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIEEXPIRETIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        id: user._id,
        token,
    });
};
