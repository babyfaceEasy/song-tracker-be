const AuthenticationController = require('./controllers/AuthenticationController')
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'successful' })
  })
  app.post('/register', (req, res) => {
    AuthenticationController.register(req, res)
  })
}
