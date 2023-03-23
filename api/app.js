require("dotenv").config({ path: "./.env" });
const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");

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
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

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

// ---------------------------------socket
const server = http.createServer(app);
const io = new Server(server, {
    cors: true,
    method: ["GET", "POST"],
});

let users = [];
let connections = [];

io.on("connection", (socket) => {
    connections.push(socket);
    console.log(`Connected: ${connections.length} sockets connected.`);

    // New User
    socket.on("new user", (data) => {
        socket.username = data;
        users.push(socket.username);
        io.emit("get users", users);
    });

    // Send Message
    socket.on("send message", (data) => {
        // code to save message in db
        io.emit("new message", { msg: data, user: socket.username });
    });

    socket.on("disconnect", (data) => {
        users.splice(connections.indexOf(socket), 1);
        io.emit("get users", users);
        connections.splice(connections.indexOf(socket.username), 1);
        console.log(`Disconnected: ${connections.length} sockets connected.`);
    });
});

server.listen(
    process.env.PORT,
    console.log(`Server running on ${process.env.PORT}`)
);
