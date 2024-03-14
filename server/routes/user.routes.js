const Router = require('express')
const router = new Router()
const UserController = require('../controller/user.controller.js'); 



const userRouter = (io) => {
    const UserCtr = new UserController(io); 
    
    router.post('/register', UserCtr.createUser)
    router.get('/register', UserCtr.getUsers)
    router.get('/register/:id', UserCtr.getOneUser)
    router.get('/me', UserCtr.getme)
    router.put('/register', UserCtr.updateUser)
    router.delete('/register/:id', UserCtr.deleteUser)
    router.post('/login', UserCtr.loginUser)
    return router;
}

module.exports = userRouter;