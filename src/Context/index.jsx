import React, { createContext, useState, useEffect } from "react";
import { fetchUsersFromAPI } from '../api'; // Importa la función para obtener usuarios desde la API

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [isUserDetailOpen, setIsUsersDetailOpen] = useState(false);
    const [userToShow, setUserToShow] = useState({});
    const [users, setUsers] = useState([]);

    const OpenUserDetail = () => setIsUsersDetailOpen(true);
    const CloseUserDetail = () => setIsUsersDetailOpen(false);

    const validateUser = (email, password) => {
        return users.find(user => user.email === email && user.password === password);
    };

    // Efecto para cargar usuarios desde la API al iniciar
    useEffect(() => {
        const loadUsers = async () => {
            const fetchedUsers = await fetchUsersFromAPI(); // Llama a la función para obtener usuarios
            console.log(fetchedUsers); 
            setUsers(fetchedUsers); // Actualiza el estado con los usuarios obtenidos
        };

        loadUsers(); // Ejecuta la función
    }, []); // El array vacío significa que se ejecuta solo una vez al montar el componente

    
const addUser = async (newUser) => {
    const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });

    if (!response.ok) {
        throw new Error('Error al crear el usuario'); // Manejo de errores
    }

    const data = await response.json(); // Obtiene la respuesta en formato JSON
    return data.id; // Devuelve el ID del nuevo usuario
};

    return (
        <AppContext.Provider value={{
            count,
            setCount,
            OpenUserDetail,
            CloseUserDetail,
            isUserDetailOpen,
            userToShow,
            setUserToShow,
            users,
            validateUser,
            addUser,
        }}>
            {children}
        </AppContext.Provider>
    );
};