const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.get('/', (req, res) => {
    res.send('index')
})

router.post('/signup', (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(422).json({ error: 'Please, fill all fields!' })
    }

    /**
     * VERIFY ACCOUNT
     */
    User.findOne({ email: email })
        .then((accountEmail) => {
            if (accountEmail) {
                res.status(422).json({ error: 'Email already used!' })
            }

            const user = new User({ name, email, password })

            user.save()
                .then(user => {
                    res.status(200).json({ message: 'Account is created.' })
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.errror(err))
})

module.exports = router