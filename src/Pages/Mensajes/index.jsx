import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import { AppContext } from "../../Context";
import Layout from "../../Components/Layout";

function Mensajes() {
    const [searchParams] = useSearchParams();
    const { currentUser } = useContext(AppContext);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const otherUserId = searchParams.get("chat");
    
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

        // Unirse al chat
        socket.emit("join_chat", {
            currentUserId: currentUser.id,
            otherUserId: otherUserId
        });

        // Recibir historial de mensajes
        socket.on("chat_history", (history) => {
            setMessages(history);
        });

        // Escuchar nuevos mensajes
        socket.on("receive_message", (data) => {
            setMessages(prev => [...prev, data]);
        });

        return () => {
            socket.off("chat_history");
            socket.off("receive_message");
        };
    }, [socket, otherUserId, currentUser]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && currentUser && otherUserId && socket) {
            const messageData = {
                content: message,
                sender: currentUser.id,
                receiver: otherUserId,
                senderName: currentUser.first_name
            };
            socket.emit("send_message", messageData);
            setMessage("");
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md h-[500px] flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-4 ${
                                    msg.sender === currentUser.id
                                        ? "text-right"
                                        : "text-left"
                                }`}
                            >
                                <div
                                    className={`inline-block p-2 rounded-lg ${
                                        msg.sender === currentUser.id
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    <p className="text-sm font-bold">{msg.senderName}</p>
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 border rounded-lg px-3 py-2"
                                placeholder="Escribe un mensaje..."
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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