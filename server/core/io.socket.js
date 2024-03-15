const socket = require('socket.io')

module.exports = function(http) {
    const io = socket(http, { cors: { origin: '*', }});
    
    io.on('connection', function(socket) {
        
        console.log('CONNECTED!');
    
    });

    return io;
}