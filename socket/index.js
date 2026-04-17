const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv")
const server = http.createServer(app);
const io = socketIO(server);


dotenv.config({
    path: "./.env"
})

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello world");
})


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);

})
