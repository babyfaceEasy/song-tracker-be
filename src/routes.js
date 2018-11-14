const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'successful' })
  })
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)
}
