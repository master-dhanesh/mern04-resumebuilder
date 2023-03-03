require("dotenv").config({ path: "./.env" });
const logger = require("morgan");
const express = require("express");
const app = express();
const PORT = process.env.PORT;

const indexRoute = require("./routes/indexRoute");

app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
