
const io = require("./server.js").io

module.exports= function(socket){
    console.log(socket.id+"oooooooyeeahh");
    socket.on('message', (data) => {
        console.log('message',data);
        socket.broadcast.emit('message',data)
    });
}