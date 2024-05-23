const express = require('express')
const dotenv = require('dotenv')
const {createServer} = require('http')

dotenv.config()

const userRouter = require('./routes/user.routes')
const dialogRouter = require('./routes/dialog.routes')

const uploadRouter = require('./routes/upload.routes')
const messageRouter = require('./routes/message.routes')
const corsMiddlecare = require('./middleware/cors.middleware')
const authMiddlecare = require('./middleware/checkAuth.middleware')
//const updateLastSeen = require('./middleware/updateLastSeen.middleware')

const createSocket = require('./core/io.socket')

const app = express()
const http = createServer(app)
const io = createSocket(http);


app.use(corsMiddlecare)
app.use(authMiddlecare)
//app.use(updateLastSeen)
app.use(express.json())       


const start =  async () => {
    try {
        app.use('/api/auth', userRouter(io))
        app.use('/api/chat', dialogRouter(io))
        app.use('/api/chat', messageRouter(io))
        app.use('/api', uploadRouter())
        

        /*io.on('connection', function(socket) {
            console.log('CONNECTED!');
        });*/

        http.listen(process.env.PORT, () => {
            console.log(`Server: http://localhost:${process.env.PORT}`)
        })
        
    } catch (e) {

    }
}

start()