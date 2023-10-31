const express = require('express')
const config = require('config')
const userRouter = require('./routes/user.routes')
const corsMiddlecare = require('./middleware/cors.middleware')

const app = express()
const PORT = config.get('serverPort')

app.use(corsMiddlecare)

const start =  async () => {
    try {
        app.use(express.json())
        app.use('/api/auth', userRouter)
        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {

    }
}

start()