
require("dotenv").config();

const express = require("express")
const app = express()
const PORT = process.env.PORT || 8001;

const {connectDB} = require("./connection")
const {router} = require("./routes/url");
const { staticRouter } = require("./routes/staticRouter");
const userRouter = require("./routes/user")
const path = require("path")
const cookieParser = require("cookie-parser")
const {checkForAuthentication} = require("./middlewares/auth")

// connection:
connectDB().then(()=>{console.log("MongoDb connected")})

// express middleware:
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthentication)

// ejs
app.set("view engine","ejs")

// use view path 
app.set("views",path.resolve("./views"))


// mounitng our router
app.use("/url",router)
app.use("/",staticRouter)
app.use("/user",userRouter)

app.listen(PORT,()=>{console.log(`Server started at PORT: `,PORT)})

