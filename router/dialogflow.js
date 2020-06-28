const express = require("express")
const router = express.Router()
const dialogflowController = require("../controller/dialogflowController")
const AuthoAuthen = require("../middlewares/AuthoAuthen")

router.use(AuthoAuthen.Authentication)
router.post("/", dialogflowController.talkToDialogflow)

module.exports = router
