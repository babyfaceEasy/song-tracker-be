const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const hashPwd = await bcrypt.hash(req.body.password, 8)
      const user = await User.create({ email: req.body.email, password: hashPwd })
      const userJSON = user.toJSON()
      res.status(200).send({ user: userJSON, token: jwtSignUser(userJSON) })
    } catch (err) {
      // email already exists kinda error
      // res.status(400).send({ error: err })
      res.status(400).send({ error: err.message })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        res.status(403).send({ error: 'The login information was incorrect.' })
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        res.status(403).send({ error: 'The login information was incorrect.' })
      }
      const userJson = user.toJSON()
      res.send({ user: userJson, token: jwtSignUser(userJson) })
    } catch (err) {
      // This might be a 500 so log it and don't show it to ur user.
      res.status(500).send({ error: 'An error occured, trying to  log in.' })
    }
  }
}
