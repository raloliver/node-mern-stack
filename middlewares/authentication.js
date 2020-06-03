const env = require('./../.env.local')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ success: false, message: 'You must be logged in!' })
    }

    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, env.SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'You must be logged in!' })
        }

        const { _id } = payload
        User.findById(_id)
            .then(currentUser => {
                req.user = currentUser
            })

        next()
    })
}