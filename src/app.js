const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors")
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173",
}))
app.use(express.static(path.join(__dirname,"../Public")));
const authrouter = require("./routes/auth.routes");
const postrouter = require("./routes/post.routes");
const userrouter = require("./routes/user.routes");

app.use(cookieparser());

app.use("/api/post",postrouter)
app.use("/api/auth", authrouter);
app.use("/api/user",userrouter)

app.get(/.*/,(req,res)=>{
   res.sendFile(path.join(__dirname,"../Public","index.html"))
})

module.exports = app;
