const Router = require('express')
const router = new Router()

const messageController = require('../controller/message.controller')

router.get('/messages', messageController.index)
router.post('/messages', messageController.create)
router.delete('/messages/:id', messageController.delete);

module.exports = router