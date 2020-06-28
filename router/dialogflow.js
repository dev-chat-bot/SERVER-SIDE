const express = require("express")
const router = express.Router()
const dialogflowController = require("../controller/dialogflowController")

router.post("/", dialogflowController.talkToDialogflow)

module.exports = router
