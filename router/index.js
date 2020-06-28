const router = require("express").Router()
const userRouter = require("./user")
const dialogflowRouter = require("./dialogflow")

router.use("/", userRouter)
router.use("/dialogflow", dialogflowRouter)

module.exports = router
