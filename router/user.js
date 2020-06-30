const router = require("express").Router()
const userController = require("../controller/userController")

router.post("/login", userController.login)
router.post("/register", userController.register)
router.post("googlelogin", userController.googleLogin)

module.exports = router
