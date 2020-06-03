const express = require('express')
const router = express.Router()
const env = require('./../.env.local')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
const User = mongoose.model('User')

router.get('/auth', auth, (req, res) => {
    res.send('index')
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(422).json({ error: 'Please, fill all fields!' })
    }

    /**
     * VERIFY ACCOUNT
     */
    User.findOne({ email: email })
        .then((currentUser) => {
            if (currentUser) {
                return res.status(422).json({ error: 'Email already used!' })
            }

            bcrypt.hash(password, 12)
                .then(bcryptPass => {
                    const user = new User({ name, email, password: bcryptPass })

                    user.save()
                        .then(() => {
                            res.status(200).json({ message: 'Account is created.' })
                        })
                        .catch(err => console.error(err))
                })


        })
        .catch(err => console.errror(err))
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(422).json({ error: 'Please, fill all fields!' })
    }
    User.findOne({ email: email })
        .then(currentUser => {
            if (!currentUser) {
                return res.status(422).json({ error: 'Email or password incorrect!' })
            }
            bcrypt.compare(password, currentUser.password)
                .then(isMatch => {
                    if (isMatch) {
                        // res.status(200).json({ message: 'You are logged in.' })
                        // #TODO: it is safe to add id from db to a token?
                        const token = jwt.sign({ _id: currentUser._id }, env.SECRET)
                        res.status(200).json({ message: 'You are logged in.', token })
                    } else {
                        return res.status(422).json({ error: 'Email or password incorrect!' })
                    }
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
})

module.exports = router