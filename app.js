const express = require('express')
const app = express()
const mongoose = require('mongoose')
const env = require('./.env.local')
const PORT = env.PORT

/**
 * MODELS
 */

require('./models/User')
mongoose.model("User")

/**
 * MIDDLEWARES
 */

app.use(express.json())
app.use(require('./routes/auth'))

/**
 * DATABASE
 */

mongoose.connect(env.mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => console.log('Connected to Atlas...'))
mongoose.connection.on('error', (err) => console.error('Error on Atlas: ', err))

app.listen(PORT, () => {
    console.warn('Server on: ', PORT)
})
