const express = require('express')
const config = require('config')

const userRouter = require('./routes/user.routes')
const dialogRouter = require('./routes/dialog.routes')
const messageRouter = require('./routes/message.routes')
const corsMiddlecare = require('./middleware/cors.middleware')

const app = express()
const PORT = config.get('serverPort')

app.use(corsMiddlecare)
app.use(express.json())

const start =  async () => {
    try {
        app.use(express.json())
        app.use('/api/auth', userRouter)
        app.use('/api/chat', dialogRouter)
        app.use('/api/chat', messageRouter)
        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {

    }
}

start()