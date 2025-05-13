import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import { AppContext } from "../../Context";
import Layout from "../../Components/Layout";

function Mensajes() {
    const [searchParams] = useSearchParams();
    const { currentUser } = useContext(AppContext);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const [otherUserOnline, setOtherUserOnline] = useState(false);
    const otherUserId = searchParams.get("chat");
    const typingTimeoutRef = useRef(null);
    
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:3001", {
            transports: ['websocket']
        });
        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        if (!socket || !otherUserId || !currentUser) return;

        console.log('Conectando usuario:', currentUser.id);
        socket.emit("user_connected", currentUser.id);

        const chatData = {
            currentUserId: currentUser.id,
            otherUserId: otherUserId
        };
        console.log('Uniéndose al chat:', chatData);
        socket.emit("join_chat", chatData);

        socket.on("chat_history", (history) => {
            setMessages(history);
        });

        socket.on("receive_message", (data) => {
            console.log('Mensaje recibido:', data);
            setMessages(prev => [...prev, data]);
        });

        socket.on("user_typing", (data) => {
            console.log('Usuario escribiendo:', data);
            setOtherUserTyping(data.isTyping);
        });

        socket.on("user_status", (data) => {
            console.log('Estado de usuario:', data);
            if (data.userId === parseInt(otherUserId)) {
                setOtherUserOnline(data.status === "online");
            }
        });

        return () => {
            console.log('Limpiando listeners');
            socket.off("chat_history");
            socket.off("receive_message");
            socket.off("user_typing");
            socket.off("user_status");
        };
    }, [socket, otherUserId, currentUser]);

    const handleTyping = () => {
        if (!socket) return;

        socket.emit("typing", {
            currentUserId: currentUser.id,
            otherUserId: otherUserId,
            isTyping: true
        });

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("typing", {
                currentUserId: currentUser.id,
                otherUserId: otherUserId,
                isTyping: false
            });
        }, 1000);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && socket) {
            const messageData = {
                senderId: currentUser.id,
                receiverId: parseInt(otherUserId),
                message: message.trim(),
                senderName: currentUser.first_name
            };
            
            console.log('Enviando mensaje:', messageData);
            socket.emit("send_message", messageData);
            setMessage("");
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-4">
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold">Chat</h2>
                        {otherUserOnline && (
                            <span className="text-green-500 text-sm">En línea</span>
                        )}
                    </div>
                    
                    <div className="h-96 overflow-y-auto p-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-4 ${msg.senderId === currentUser.id ? 'text-right' : 'text-left'}`}
                            >
                                <div className={`inline-block p-2 rounded-lg ${
                                    msg.senderId === currentUser.id 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200'
                                }`}>
                                    <p>{msg.message}</p>
                                    <span className="text-xs">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {otherUserTyping && (
                            <div className="text-gray-500 text-sm">
                                Escribiendo...
                            </div>
                        )}
                    </div>

                    <form onSubmit={sendMessage} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    handleTyping();
                                }}
                                className="flex-1 p-2 border rounded"
                                placeholder="Escribe un mensaje..."
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Mensajes;