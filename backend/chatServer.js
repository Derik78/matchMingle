// Este archivo es el servidor de WebSocket para manejar la comunicación en tiempo real entre los usuarios
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5000",
        methods: ["GET", "POST"]
    }
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on("user_connected", (userId) => {
        console.log('Usuario identificado:', userId);
        onlineUsers.set(userId, socket.id);
        io.emit("user_status", {
            userId: userId,
            status: "online"
        });
    });

    socket.on("join_chat", (data) => {
        console.log('Usuario uniéndose al chat:', data);
        const chatRoom = `chat_${[data.currentUserId, data.otherUserId].sort().join("_")}`;
        socket.join(chatRoom);
    });

    socket.on("send_message", (data) => {
        console.log('Mensaje recibido:', data);
        const chatRoom = `chat_${[data.senderId, data.receiverId].sort().join("_")}`;
        const messageWithTimestamp = {
            ...data,
            timestamp: new Date().toISOString()
        };
        io.to(chatRoom).emit("receive_message", messageWithTimestamp);
    });

    socket.on("typing", (data) => {
        const chatRoom = `chat_${[data.currentUserId, data.otherUserId].sort().join("_")}`;
        socket.to(chatRoom).emit("user_typing", {
            userId: data.currentUserId,
            isTyping: data.isTyping
        });
    });

    socket.on("disconnect", () => {
        console.log('Usuario desconectado:', socket.id);
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                io.emit("user_status", {
                    userId: userId,
                    status: "offline"
                });
                break;
            }
        }
    });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`Servidor de chat corriendo en puerto ${PORT}`);
});