
const {handleCreateNewShortUrl} = require("../controllers/url")

const {restrictToLoggedInUserOnly} = require("../middlewares/auth")

const express = require("express")
const router = express.Router()


router.post("/",restrictToLoggedInUserOnly,handleCreateNewShortUrl)

module.exports = {
    router,
} 