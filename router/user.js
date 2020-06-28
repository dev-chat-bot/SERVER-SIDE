const router = require('express').Router()
const userController = require('../controller/userController')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/facebooklogin', userController.facebookLogin)

module.exports = router