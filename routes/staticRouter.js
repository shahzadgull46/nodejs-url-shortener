const express = require("express");
const { restrictToLoggedInUserOnly} = require("../middlewares/auth")

const {
  handleRedirectUrl,
  handleGetUrlAnalytics,
  handleHomePage,
} = require("../controllers/url");

const staticRouter = express.Router();

staticRouter.get("/analytics/:shortId", handleGetUrlAnalytics);
staticRouter.get("/",restrictToLoggedInUserOnly, handleHomePage);
staticRouter.get("/signup", (req, res) => {
  return res.render("signup");
});
staticRouter.get("/login",(req,res)=>{
      return res.render("login");

})

staticRouter.get("/:shortId", handleRedirectUrl);

module.exports = {
  staticRouter,
};
