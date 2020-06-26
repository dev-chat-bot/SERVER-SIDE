const User = require('../model/User')
const {comparePassword} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')

class UserController{
    static async login(req, res){
        let {username, password} = req.body
        try {
            let user = await User.findOne({username})
            if(!user){
                user = await User.findOne({email: username})
            }
            let {_id, email} = user
            // if(comparePassword(password, user.password)){
            // }
            let access_token = generateToken({ _id, email, username: user.username })
            res.status(200).json({access_token})
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        }
    }

    static async register(req, res){
        let {email, username, password, confirmPassword} = req.body
        try {
            const user = new User({
                email,
                username,
                password,
                confirmPassword
            })
            const newUser = await user.save()
            let access_token = generateToken({_id: newUser._id, email: newUser.email, username: newUser.username})
            res.status(201).json({access_token})
        } catch (error) {
            res.status(500).json({error})
        }
    }
}

module.exports = UserController