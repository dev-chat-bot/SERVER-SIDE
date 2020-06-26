const router = require('express').Router()
const userRouter = require('./user')

router.use('/', userRouter)

module.exports = router