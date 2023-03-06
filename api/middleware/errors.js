exports.createErrors = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;

    if (err.name === "TokenExpiredError") {
        err.message = "Session timeout!";
    }
    if (
        err.name === "MongoServerError" &&
        err.message.includes("E11000 duplicate key")
    ) {
        err.message = "User already exists " + req.body.email;
    }

    // error json
    res.status(statusCode).json({
        message: err.message,
        errname: err.name,
        // stack: err.stack,
    });
};
