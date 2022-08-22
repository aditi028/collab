let prt = 3001 || process.env.PORT;

const io = require('socket.io')(prt ,{
    cors:{
        origin:'http://localhost:3000' || 'https://collab-live-client.herokuapp.com',
        methods: ['GET','POST']
    }
})

io.on("connection", socket=>{
   socket.on('get-document',documentId=>{
    console.log(documentId)
    const data=""
    socket.join(documentId)
    // socket.emit('load-document',data)
    socket.on('send-changes',change=>{
        console.log("server received => ",change)
        socket.broadcast.to(documentId).emit("receive-changes",change)
    })
   })
})