const express = require('express');
const authrouter = express.Router();
const authcontroller = require("../controller/auth.controller");
const identify = require('../middleware/auth.middleware');

authrouter.post("/register",authcontroller.registercontroller)

authrouter.post("/login",authcontroller.logincontroller)

authrouter.get("/get-me",identify,authcontroller.getmecontroller)

module.exports = authrouter;