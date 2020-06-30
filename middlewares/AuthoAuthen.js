const User = require("../model/User")
const { verifyToken } = require("../helper/jwt")

class AuthoAuthen {
  // static Authorization(req, res, next) {

  // }
  static Authentication(req, res, next) {
    const { token } = req.headers
    try {
      const decode = verifyToken(token)
      const { _id } = decode
      User.findById(_id).then((user) => {
        req.currentUser = _id
        next()
      })
    } catch (error) {
      /* istanbul ignore next */
      if (error.message == "jwt malformed") {
        res.status(400).json({ error: "Please Login First" })
      }
    }
  }
}

module.exports = AuthoAuthen
