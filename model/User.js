const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'field cannot be empty'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'field cannot be empty'],
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'field cannot be empty']
    },
    confirmPassword: {
        type: String,
        required: [true, 'field cannot be empty']
    }
})

const User = mongoose.model('users', UserSchema)

module.exports = User