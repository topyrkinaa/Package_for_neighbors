const Router = require('express')
const router = new Router()

const dialogController = require('../controller/dialog.controller')

router.get('/dialogs/:id', dialogController.index)
router.post('/dialogs', dialogController.create)
router.delete('/dialogs/:id', dialogController.deleteDialog);


module.exports = router