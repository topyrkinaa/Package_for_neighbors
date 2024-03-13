const Router = require('express')
const router = new Router()


const userController = require('../controller/user.controller.js')

router.post('/register', userController.createUser)
router.get('/register', userController.getUsers)
router.get('/register/:id', userController.getOneUser)
router.get('/me', userController.getme)
router.put('/register', userController.updateUser)
router.delete('/register/:id', userController.deleteUser)
router.post('/login', userController.loginUser)

module.exports = router