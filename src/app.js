const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { sequelize } = require('./models')
const { config } = require('./config/config')
const app = express()

// ================================================
// CORS SECTION
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

// ===================================================
// BODY PARSER SECTION
app.use(bodyParser.json())

// ================================================
// ROUTES
require('./routes')(app)

// ==================================================
// SEQUELIZE AND APP START
sequelize.sync()
  .then(() => {
    app.listen(8081)
    console.log(`Server started on ` + 8081)
  })
