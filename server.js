require('dotenv').config();
const app = require("./src/app")
const ConnectDB = require("./src/config/database")

ConnectDB()
// app.use("/api/auth")
app.listen(3000,()=>{
    console.log("Server is Started...")
})