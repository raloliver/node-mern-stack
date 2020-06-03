const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT | 5000

/**
 * MODELS
 */

require('./models/User')
mongoose.model("User")

const connectDB = async (operations, res) => {
    try {
        const connect = await mongoose.connect(process.env.mongoDB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const db = connect.on('connected', () => {
            console.log('connected on mongo atlas')
        });

        await operations(db);

        connect.close();
    } catch (error) {
        res.status(500).send({ message: 'Error connection to database', error });
    }
};


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

app.get('/', async (req, res) => {
    connectDB(
        async (db) => {
            res.status(200).send('index')
        },
        res
    );
})

app.get('/about', middleware, (req, res) => {
    res.status(200).send('about')
})
