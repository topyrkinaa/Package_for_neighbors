const Router = require('express');
const router = new Router();
const MessageController = require('../controller/message.controller');
const io = require('../index');

const messageRouter = (io) => {
    
    const MessageCtr = new MessageController(io);

    router.delete('/messages', MessageCtr.delete);
    router.get('/messages', MessageCtr.index);
    router.post('/messages', MessageCtr.create);

    return router;
};

module.exports = messageRouter;