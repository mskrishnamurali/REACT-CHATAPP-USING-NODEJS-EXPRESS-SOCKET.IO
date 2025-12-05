const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        // Send message to all other clients except sender
        socket.broadcast.emit("receive_message", data);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
