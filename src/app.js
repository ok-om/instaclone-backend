const express = require('express');
const cookieparser = require('cookie-parser');
const app = express()
app.use(express.json())
const authrouter = require("./routes/auth.routes")
app.use(cookieparser())
app.use("/api/auth",authrouter)
module.exports = app