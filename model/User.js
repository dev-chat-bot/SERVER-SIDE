const mongoose = require('mongoose')
const {generatePassword} = require('../helper/bcrypt')
const {isEmail} = require('validator')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true],
        unique: true,
        validate: [isEmail, 'please enter valid email']
    },
    username: {
        type: String,
        required: [true],
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        required: [true]
    },
    confirmPassword: {
        type: String,
        required: [true]
    }
})

UserSchema.pre('save', function(next){
    let user = this
    user.password = generatePassword(user.password)
    next()
})

const User = mongoose.model('users', UserSchema)

module.exports = User