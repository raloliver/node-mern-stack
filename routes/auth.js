const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('index')
})

router.post('/signup', (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(422).json({ error: "Please, fill all fields!" })
    }

    res.status(200).json({ message: "Account is created!" })
})

module.exports = router