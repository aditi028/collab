const io = require('socket.io')(3001,{
    cors:{
        origin:'http://localhost:3000',
        methods: ['GET','POST']
    }
})

io.on("connection", socket=>{
    socket.on("send-changes",data=>{
        console.log("server received =>"+data);
        socket.broadcast.emit("receive-changes",data); //broadcast to all except current user
    })
})