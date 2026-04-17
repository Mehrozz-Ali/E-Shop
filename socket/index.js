const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


require("dotenv").config({
    path: "./.env"
})

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello world");
});


let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId })
};

// removing user from a socket 
const removerUser = (socketId) => {
    users = users.filter((user) => socketId !== user.socketId);
};

// getting user from a socket
const getUser = (userId) => {
    return users.find((user) => user.userId === receiverId);
};



// define a message object with a seen property
const createMessage = ({ senderId, receiverId, text, images }) => ({
    senderId,
    receiverId,
    text,
    images,
    seen: false

});


io.on("connection", (socket) => {
    console.log("a user is connected");
    // take user id and socket id from user 
    socket.on("addUser", (userId) => {
        addUser(userId, socket.Id);
        io.emit("getUSer", users)
    })

    // send nd get message
    const messages = {}    // object to track message sent to a user

    socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
        const message = createMessage({ senderId, receiverId, text, images });

        const user = getUser(receiverId);

        // store the message in the messages object
        if (!messages[receiverId]) {
            messages[receiverId] = [message];
        } else {
            messages[receiverId].push(message);
        }

        // send the message to  the receiver
        io.to(user?.socketId).emit("getMessage",message);
    });

    socket.on("messageSeen",({senderId,receiverId,messageId})=>{
        const user=getUser(senderId);

        // update the seen flag for a message 
        if(messages[senderId]){
            const message=messages[senderId].find((message)=>message.receiverId===receiverId && message.id===messageId);
            if(message){
                message.seen=true;
                // send a message seen event to sender
                io.to(user?.socketId).emit("messageSeen",{
                    senderId,
                    receiverId,
                    messageId,
                })
            }
        }
    })

    // update and get last message 
socket.on("updateLastMessage",({lastMessage,lastMessageId})=>{
    io.emit("getLastMessage",{
        lastMessage,
        lastMessageId,
    })
});


// when socket will disconnect
socket.on("disconnect",()=>{
    console.log(`A user disconnected`);
    removeUser(socket.id);
    io.emit("getUser",users);
    
})

});




server.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);

});
