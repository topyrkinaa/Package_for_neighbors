const express = require('express')
const config = require('config')
const dotenv = require('dotenv')


const userRouter = require('./routes/user.routes')
const dialogRouter = require('./routes/dialog.routes')
const messageRouter = require('./routes/message.routes')
const corsMiddlecare = require('./middleware/cors.middleware')
const AuthMiddlecare = require('./middleware/checkAuth.middleware')

const app = express()
dotenv.config()
const PORT = config.get('serverPort')

app.use(corsMiddlecare)
app.use(AuthMiddlecare)
app.use(express.json())

const start =  async () => {
    try {
        app.use(express.json())
        app.use('/api/auth', userRouter)
        app.use('/api/chat', dialogRouter)
        app.use('/api/chat', messageRouter)
        app.listen(process.env.PORT, () => {
            console.log(`Server: http://localhost:${process.env.PORT}`)
        })
    } catch (e) {

    }
}

start()