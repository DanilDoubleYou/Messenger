const { Socket } = require("socket.io")

const io = require("socket.io")(8000, {
    cors: {
        origin: "http://localhost:3000",
    },
})

let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user === userId) &&
        users.push({userId, socketId} )

}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

io.on("connection", (socket) => {

    //connection
    console.log("a user connected.")
    
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })
    
    //send message
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        })
    })

    //disconnection
    socket.on("disconnect", () => {
        console.log("a user disconnected.")
        
        removeUser(socket.id)
    })
})

