console.log('hello')

const express = require('express')

const bodyParser = require('body-parser')
//const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
  });

app.use(bodyParser.json())

app.get('/status', (req, res) => {
    res.send({message: 'Hello world!'})
})

app.post('/register', (req,res) => {
    res.send({message: `Your ${req.body.email} user was registered, have fun!`})
})

app.listen(process.env.PORT || 8081)
