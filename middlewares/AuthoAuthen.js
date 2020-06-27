const User = require('../model/User');
const {verifyToken} = require('../helper/jwt')

class AuthoAuthen {
  static Authorization(req, res, next) {

  }
  static Authentication(req, res, next) {
    const {token} = req.headers
    try {
      const decode = verifyToken(token)
      const {_id} = decode
      User.findById(_id)
        .then(user => {
          if(user) {
            req.currentUser = _id
            next()
          } else {
            throw Error('Please Login First')
          }
        })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}

modules.exports = AuthoAuthen