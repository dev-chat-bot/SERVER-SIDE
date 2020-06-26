require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./router')

mongoose.connect('mongodb://localhost:27017/adeps', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

module.exports = app