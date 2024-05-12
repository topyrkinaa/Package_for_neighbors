const socket = require('socket.io')

module.exports = function(http) {
    const io = socket(http, { cors: { origin: '*', }});
    
    io.on('connection', function(socket) {
        socket.on("DIALOG:JOIN", (dialogId) => {
            socket.dialogId = dialogId;
            socket.join(dialogId);
            console.log('JOINED',dialogId);
        });

        socket.on('DIALOGS:TYPING', (obj) => {
            console.log(obj);
            socket
                .to(obj.dialogId)
                .emit('DIALOGS:TYPING', obj)
        })
    });

    return io;
};