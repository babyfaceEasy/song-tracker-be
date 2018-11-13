const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { sequelize } = require('./models')
const { config } = require('./config/config')

const app = express()

app.use(morgan('combined'))
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept')

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

app.use(bodyParser.json())

app.get('/status', (req, res) => {
  res.send({ message: 'Hello world!' })
})

app.post('/register', (req, res) => {
  res.status(200).json({ message: `Your ${req.body.email} user was registered, have fun!` })
})

sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on ${config.port}`)
  })
