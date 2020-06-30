const User = require("../model/User")
const { comparePassword } = require("../helper/bcrypt")
const { generateToken } = require("../helper/jwt")
const verificationToken = require("../helper/googleOauth")

class UserController {
  static async login(req, res) {
    let { username, password } = req.body
    try {
      let user = await User.findOne({ username })
      if (!user) {
        user = await User.findOne({ email: username })
      }
      if (user === null) {
        throw Error("user does'nt exit")
      }
      let { _id, email } = user
      if (comparePassword(password, user.password)) {
        let access_token = generateToken({
          _id,
          email,
          username: user.username,
        })
        res.status(200).json({ 
            access_token, 
            username 
        })
      } else {
        res.status(400).json({ error: "password not match" })
      }
    } catch (error) {
      if (error.message === "user does'nt exit") {
        res.status(400).json({ error: "user does'nt exit" })
      } else {
        /* istanbul ignore next */
        res.status(500).json({ error: "something went wrong" })
      }
    }
  }

  static async register(req, res) {
    let { email, username, password, confirmPassword } = req.body
    try {
      const user = new User({
        email,
        username,
        password,
        confirmPassword,
      })
      if (password !== confirmPassword) {
        throw Error("password not match")
      }
      const newUser = await user.save()
      let access_token = generateToken({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      })
      res.status(201).json({ 
          access_token, 
          username: newUser.username 
        })
    } catch (error) {
      if (error.keyValue) {
        if (error.keyValue.email) {
          res.status(400).json({ error: "email already exists" })
        } else if (error.keyValue.username) {
          res.status(400).json({ error: "username already exists" })
        }
      } else if (error.errors) {
        if (error.errors.password) {
          const message = error.errors.password.properties.type
          if (message == "required") {
            res.status(400).json({ error: "field must not be empty" })
          }
          if (message == "minlength") {
            res
              .status(400)
              .json({ error: "password length min have 8 characters" })
          }
        } else if (error.errors.email) {
          const message = error.errors.email.properties
          if (message.type == "required") {
            res.status(400).json({ error: "field must not be empty" })
          }
          if (message.type == "user defined") {
            res.status(400).json({ error: message.message })
          }
        } else if (error.errors.username) {
          const message = error.errors.username.properties.type
          if (message == "required") {
            res.status(400).json({ error: "field must not be empty" })
          }
        }
      } else if (error.message) {
        res.status(400).json({ error: error.message })
      } else {
        /* istanbul ignore next */
        res.status(500).json({ error: "something went wrong" })
      }
    }
  }

  static async googleLogin(req, res) {
    // /* istanbul ignore next */
    const {google_token} = req.headers
    let email
    /* istanbul ignore next */
    try {
        let verifyToken = await verificationToken(google_token)
        email = verifyToken.email
        let user = await User.findOne({email})
        if (user) {
            let { _id, username, email } = user
            let access_token = generateToken({ 
                _id, 
                username, 
                email 
            })
            res.status(200).json({ 
                access_token, 
                username 
            })
        } else {
            let newuser = new User({
                email,
                username: email.split("@")[0],
                password: process.env.PASSWORD,
                confirmPassword: process.env.PASSWORD,
            })
            let newUser = await newuser.save()
            let access_token = generateToken({
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
            })
            res.status(201).json({ 
                access_token, 
                username: newUser.username 
            })
        }
    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
  }
}

module.exports = UserController
