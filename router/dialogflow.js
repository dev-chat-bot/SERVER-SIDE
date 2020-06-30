const express = require("express")
const router = express.Router()
const dialogflowController = require("../controller/dialogflowController")
const AuthoAuthen = require("../middlewares/AuthoAuthen")

router.use(AuthoAuthen.Authentication)
router.post("/", dialogflowController.talkToDialogflow)
router.post("/intents", dialogflowController.createNewIntent)
router.get("/intents", dialogflowController.getAllIntents)
router.delete("/intents/:id", dialogflowController.deleteIntent)
module.exports = router
