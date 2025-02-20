//socket es una biblioteca que permite la comunicación bidireccional, por ejemplo cuando se usa join para ingresar a la sala, emit para enviar algun mensaje o on para recibir y escuchar.

//Importa el framework Express completo para crear el servidor web y las rutas.
const express = require('express');
//Importa el módulo http para crear un servidor HTTP de Node.js.
const { createServer } = require('http');
//Importa el módulo socket.io para habilitar la comunicación en tiempo real.
const { Server } = require('socket.io');
//Importa el módulo cors para permitir solicitudes de otros orígenes.
const cors = require('cors');

// Crea una instancia de Express
const app = express();
// Habilita CORS
app.use(cors());

// Crea un servidor HTTP con Express
const httpServer = createServer(app);
// Crea una instancia de Socket.IO y la asocia con el servidor HTTP
const io = new Server(httpServer, {
    // Configuración de CORS para permitir solicitudes desde http://localhost:5173 y solo los métodos GET y POST
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Mapa para almacenar historial de mensajes por sala
const chatRooms = new Map();

// Función para obtener el ID de la sala de chat
const getChatRoomId = (user1, user2) => {
    return [user1, user2].sort().join('_');
};

//Se ejecuta cuando un cliente se conecta al servidor, Cada conexión recibe un objeto socket único con un id aleatorio, Registra en consola cuando un usuario se conecta
io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    //genera un roomid unico, une al usuario a esa sala especifica
    socket.on("join_chat", (data) => {
        const { currentUserId, otherUserId } = data;
        const roomId = getChatRoomId(currentUserId, otherUserId);
        
        socket.join(roomId);
        console.log(`Usuario ${currentUserId} se unió al chat ${roomId}`);

        // verifica si existe la sala en el Map chatRooms, Si no existe, crea una nueva sala vacía, Envía el historial de mensajes al usuario que se unió a la sala
        if (!chatRooms.has(roomId)) {
            chatRooms.set(roomId, []);
        }
        socket.emit("chat_history", chatRooms.get(roomId));
    });
    //socket.on: Es un método que escucha eventos
    //"send_message": Es el nombre del evento que escucha
    //(data) =>: Es una arrow function que recibe el parámetro data
    // data: Es un objeto que contiene la información del mensaje enviado por el cliente
    socket.on("send_message", (data) => {
        const roomId = getChatRoomId(data.sender, data.receiver);
        const messageWithTimestamp = {
            ...data,
            timestamp: new Date().toISOString()
        };

        // Intenta obtener el array de mensajes existente para esa sala, si no existe usa un array vacío
        const roomMessages = chatRooms.get(roomId) || [];

        roomMessages.push(messageWithTimestamp);

        //chatRooms.set(): Actualiza el Map con los nuevos mensajes, roomId: Es la clave única de la sala, roomMessages: Es el array actualizado con el nuevo mensaje
        chatRooms.set(roomId, roomMessages);

        // Emitir mensaje a todos en la sala
        io.to(roomId).emit("receive_message", messageWithTimestamp);
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.id);
    });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`Servidor de chat corriendo en puerto ${PORT}`);
});