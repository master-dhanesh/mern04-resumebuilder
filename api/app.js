require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

// database connectivity
require("./models/database").getconnection();

// logging
const logger = require("morgan");
app.use(logger("tiny"));
// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// express-session
const session = require("express-session");
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESSSESSION,
    })
);
// cors
app.use(require("cors")({ credentials: true }));

// express file upload
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// routes
const indexRoutes = require("./routes/indexRoutes");
app.use("/", indexRoutes);

// error handling
const ErrorHandler = require("./utils/ErrorHandler");
const { createErrors } = require("./middleware/errors");
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Requested URL ${req.path} not found`, 404));
});
app.use(createErrors);

app.listen(
    process.env.PORT,
    console.log(`Server running on ${process.env.PORT}`)
);
