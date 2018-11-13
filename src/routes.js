module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.status(200).json({ message: `Your ${req.body.email} user was registered, have fun!` })
  })
}
