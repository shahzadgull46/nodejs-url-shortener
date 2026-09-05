
const User = require("../models/user")
const { Url } = require("../models/url");

const {setUser} = require("../service/auth")
const { v4} = require("uuid")


async function handleSignupUser(req,res) {
  const {name,email,password} = req.body
  await User.create({
    name,
    email,
    password,
  })
res.redirect("/login")
}

async function handleUserLogin(req,res) {
  const {email,password} = req.body
  const user = await User.findOne({
    email: email,
    password: password,
  })
  if (!user) {
    return res.redirect("/login")
}
const token = setUser(user)
  res.cookie("token",token)
   res.redirect("/")
 
 
// res.json({token})
}
async function handleAdminUrls(req,res) {
  const allUrls = await Url.find({})
  res.render("admin",{
      urls: allUrls
  })
}
module.exports = {
  
  handleSignupUser,
  handleUserLogin,
  handleAdminUrls,
};
