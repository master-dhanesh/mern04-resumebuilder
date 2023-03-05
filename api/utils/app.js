require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

// database connectivity
require("../models/database").getconnection();

// logging
const logger = require("morgan");
app.use(logger("tiny"));
// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const indexRoutes = require("../routes/indexRoutes");
app.use("/", indexRoutes);

// error handling
const ErrorHandler = require("./ErrorHandler");
const { createErrors } = require("../middleware/errors");
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Requested URL ${req.path} not found`, 404));
});
app.use(createErrors);

app.listen(
    process.env.PORT,
    console.log(`Server running on ${process.env.PORT}`)
);
