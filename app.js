const express = require('express')
const app = express()
const PORT = 5000

const middleware = (req, res, next) => {
    console.log('middleware')
    next()
}

/**
 * apply for all requests, app.use()
 */
// app.use(middleware)

app.listen(PORT, () => {
    console.warn('Server on 5000')
})

app.get('/', (req, res) => {
    res.status(200).send('index')
})

app.get('/about', middleware, (req, res) => {
    res.status(200).send('about')
})
