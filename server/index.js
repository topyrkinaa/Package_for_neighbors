const express = require('express')
const dotenv = require('dotenv')
const socket = require('socket.io')
const {createServer} = require('http')

const userRouter = require('./routes/user.routes')
const dialogRouter = require('./routes/dialog.routes')
const messageRouter = require('./routes/message.routes')
const corsMiddlecare = require('./middleware/cors.middleware')
const authMiddlecare = require('./middleware/checkAuth.middleware')

const app = express()
const http = createServer(app)
const io = socket(http, {
    cors: {
      origin: '*',
    }
});


dotenv.config()
app.use(corsMiddlecare)
app.use(authMiddlecare)
app.use(express.json())       


const start =  async () => {
    try {
        app.use(express.json())
        app.use('/api/auth', userRouter)
        app.use('/api/chat', dialogRouter)
        app.use('/api/chat', messageRouter)

        io.on('connection', function(socket) {
            console.log('CONNECTED!');
            socket.emit('111', 'QWEQWEQWEQWEQWEQWE')

            socket.on('222', function(msg) {
                console.log('CLIENT SAY:' + msg);
            });

        });

        http.listen(process.env.PORT, () => {
            console.log(`Server: http://localhost:${process.env.PORT}`)
        })
        
    } catch (e) {

    }
}

start()