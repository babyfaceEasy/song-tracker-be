const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.status(200).send(user.toJSON())
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
        res.status(403).send({ error: 'User not found.' })
      }
      const isPasswordValid = await user.comparePassword(password)
      console.log(`IS_PASSWORD_VALID: ${isPasswordValid}`)
      if (!isPasswordValid) {
        res.status(403).send({ error: 'Passwords do not match.' })
      }
      const userJson = user.toJSON()
      res.status(200).send({ user: userJson, token: jwtSignUser(userJson) })
    } catch (err) {
      // This might be a 500 so log it and don't show it to ur user.
      res.status(403).send({ error: err.message })
    }
  }
}
