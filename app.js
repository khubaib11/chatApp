const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3001;
// Serve static files
app.use(express.static(path.resolve("./public")));




//use socket.io
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('user-message', (msg) => {
        io.emit('message',socket.id+": "+ msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



app.get('/', (req,res)=>{
    res.sendFile("/public/index.html");
});




server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
