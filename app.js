const express = require('express')
const app = express()
const PORT = 5000

const middleware = () => console.log('middleware')

app.use(middleware)

app.listen(PORT, () => {
    console.warn('Server on 5000')
})

app.get('/', (req, res) => {
    res.status(200).send('OK')
})
