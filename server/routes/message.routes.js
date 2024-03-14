const Router = require('express');
const router = new Router();
const MessageController = require('../controller/message.controller');
const io = require('../index');

const messageRouter = (io) => {
    
    const MessageCtr = new MessageController(io);

    router.get('/messages', MessageCtr.index);
    router.post('/messages', MessageCtr.create);
    router.delete('/messages/:id', MessageCtr.delete);

    return router;
};

module.exports = messageRouter;