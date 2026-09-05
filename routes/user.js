
const express = require("express")
const {handleSignupUser,handleUserLogin,handleAdminUrls} = require("../controllers/user")
const {restrictTo} = require("../middlewares/auth")

const userRouter = express.Router()

userRouter.post("/",handleSignupUser)
userRouter.post("/login",handleUserLogin)
userRouter.get("/admin/urls",restrictTo(["ADMIN"]),handleAdminUrls)
module.exports = userRouter   