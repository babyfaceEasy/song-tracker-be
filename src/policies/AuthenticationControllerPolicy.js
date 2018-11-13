/* eslint-disable no-unused-vars */
const Joi = require('joi')
module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-z0-9]{8,32}$'))
    }

    const { error, value } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({ error: 'You must provide a valid email address.' })
          break
        case 'password':
          res.status(400).send({ error: `The password provided must follow tht following rules: 
          <br>
          1. It must contain ONLY the following xters : lower case, upper case and digits.
          <br>
          2. It must be at least 8 characters short and at most 32 characters long.`
          })
          break
        default :
          // TODO: log the error from Joi.
          res.status(400).send({ error: `An error occured, please try again later.` })
      }
    }
    next()
  }
}
