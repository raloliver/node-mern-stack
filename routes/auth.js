const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('index')
})

router.post('/signup', (req, res, next) => {
    console.log(req.body)
    next()
})

module.exports = router