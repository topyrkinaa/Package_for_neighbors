const Router = require('express')
const router = new Router()


const userController = require('../controller/user.controller.js')

router.post('/register', userController.createUser)

module.exports = router