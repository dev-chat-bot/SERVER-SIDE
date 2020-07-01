require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./router')

if(process.env.NODE_ENV == 'test'){
    mongoose.connect('mongodb://localhost:27017/adepsTest', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
} else {
    mongoose.connect('mongodb://localhost:27017/adeps', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

module.exports = app