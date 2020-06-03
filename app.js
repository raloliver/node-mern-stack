const express = require('express')
const app = express()
const mongoose = require('mongoose')
const env = require('./.env.local')
const PORT = env.PORT || 5000

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

mongoose.connect(env.mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => console.log('db is online'))
mongoose.connection.on('error', (err) => console.error('error on db: ', err))

const connectDB = async (operations, res) => {
    try {

        const db = connect.on('connected', () => {
            console.log('connected on mongo atlas')
        });

        await operations(db);

        connect.close();
    } catch (error) {
        res.status(500).send({ message: 'Error connection to database', error });
    }
};

app.listen(PORT, () => {
    console.warn('Server on 5000')
})
