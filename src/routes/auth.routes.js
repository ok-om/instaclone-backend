const express = require('express');
const authrouter = express.Router();
const authcontroller = require("../controller/auth.controller")

authrouter.post("/register",authcontroller.registercontroller)

authrouter.post("/login",authcontroller.logincontroller)

module.exports = authrouter;