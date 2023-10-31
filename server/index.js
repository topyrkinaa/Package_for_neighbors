const express = require('express')
const config = require('config')
const userRouter = require('./routes/user.routes')


const app = express()
const PORT = config.get('serverPort')


const start =  async () => {
    try {
        app.use(express.json())
        app.use('/api', userRouter)
        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {

    }
}

start()