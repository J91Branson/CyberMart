const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

  exports.signin =  (req, res) => {
    User.findOne({
      "email": req.body.email
    }, (err, user) => {

      if (err || !user)
        return res.status('401').json({
          error: "User not found"
        })

      if (!user.authenticate(req.body.password)) {
        return res.status('401').send({
          error: "Email and password don't match."
        })
      }

      const token = jwt.sign({
        _id: user._id
      }, config.jwtSecret)

      res.cookie("t", token, {
        expire: new Date() + 9999
      })

      return res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email }
      })

    })
  },

  exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
      message: "signed out"
    })
  },

  exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
  },

  exports.requireSignin = expressJwt(
    {
      secret: config.jwtSecret,
      userProperty: 'auth'
    }
  )


