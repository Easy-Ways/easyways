const io = require('socket.io')(4000);
io.on("connection", socket=>{
    console.log(socket.id);
})