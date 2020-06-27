const mongoose = require('mongoose')
const {generatePassword} = require('../helper/bcrypt')
const { use } = require('../router')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true],
        unique: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'please enter valid email'
        }
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

// User.path('email').validate(function (email) {
//     var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//     return emailRegex.test(email.text); // Assuming email has a text attribute
//  }, 'test email validate')

module.exports = User