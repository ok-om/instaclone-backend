const express = require("express");
const cookieparser = require("cookie-parser");

const app = express();

app.use(express.json());

const authrouter = require("./routes/auth.routes");
const postrouter = require("./routes/post.routes");
const userrouter = require("./routes/user.routes");

app.use(cookieparser());

app.use("/api/post",postrouter)
app.use("/api/auth", authrouter);
app.use("/api/user",userrouter)
module.exports = app;
