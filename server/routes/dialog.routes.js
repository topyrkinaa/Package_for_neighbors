const Router = require('express')
const router = new Router()
const DialogController = require('../controller/dialog.controller')


const dialogRouter = (io) => {
    const DialogCtr = new DialogController(io);
    
    router.get('/dialogs/:id', DialogCtr.index)
    router.post('/dialogs', DialogCtr.create)
    router.delete('/dialogs/:id', DialogCtr.deleteDialog);

    return router;
}


module.exports = dialogRouter;