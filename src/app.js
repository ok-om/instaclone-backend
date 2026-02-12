const express = require("express");
const cookieparser = require("cookie-parser");

const app = express();

app.use(express.json());

const authrouter = require("./routes/auth.routes");
const postrouter = require("./routes/post.routes");

app.use(cookieparser());

app.use("/api/post",postrouter)
app.use("/api/auth", authrouter);
module.exports = app;
