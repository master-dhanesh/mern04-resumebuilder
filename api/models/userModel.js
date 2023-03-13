const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [4, "Name must have atleast 4 characters"],
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            match: [
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email",
            ],
        },
        password: {
            type: String,
            select: false,
            minLength: [6, "Password must have atleast 6 characters"],
            required: [true, "Password is required"],
            // match: [
            //     /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{6,15}$/,
            //     "Invalid Password! Valid Password includes atleast 1 Uppercase, 1 Lowercase, 1 Digit, 1 symbol",
            // ],
        },
        contact: {
            type: String,
            minLength: [10, "Contact must have 10 characters"],
            maxLength: [10, "Contact must have atmost 10 characters"],
            required: [true, "Contact is required"],
        },
        avatar: {
            type: Object,
            default: {
                fileId: "",
                url: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=879&q=80",
            },
        },
        links: {
            type: Object,
            default: {
                linkedin: "",
                github: "",
                behance: "",
            },
        },
        resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "resume" }],
        otp: String,
    },
    { timestamps: true }
);

userModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

userModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userModel.methods.jwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWTSECRET, {
        expiresIn: process.env.TOKENEXPIRETIME,
    });
};

const User = mongoose.model("user", userModel);
module.exports = User;
