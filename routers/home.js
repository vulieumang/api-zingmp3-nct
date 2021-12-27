const express = require("express")
const router = express.Router()

const home = require("../controllers/HomeController")

router.get("/", home.index)
router.get("/readme", home.readme)

module.exports = router
