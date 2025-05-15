import React, { createContext, useState, useEffect } from "react";
import { fetchUsersFromAPI } from '../api'; // Importa la función para obtener usuarios desde la API

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [count, setCount] = useState(0); // Este será el contador de likes
    const [isUserDetailOpen, setIsUsersDetailOpen] = useState(false); // Control modal detalles
    const [userToShow, setUserToShow] = useState({}); // Usuario a mostrar en el modal
    const [currentUser, setCurrentUser] = useState(null); // Usuario actual
    const [users, setUsers] = useState([]); // Lista de usuarios

    const OpenUserDetail = () => setIsUsersDetailOpen(true);
    const CloseUserDetail = () => setIsUsersDetailOpen(false);

    // Función para validar el usuario al iniciar sesión
    const validateUser = (email, password) => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            setCurrentUser(user); // Establecer el usuario actual
            fetchLikesCount(user.id); // Obtener el conteo de likes al iniciar sesión
        }
        return user; // Devolver el usuario encontrado
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


    //Después de registrar el "like", el componente Card llama a context.fetchLikesCount(data.id) para actualizar el conteo de "likes" del usuario que recibió el "like"
    const fetchLikesCount = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/likes/${userId}`);
            if (!response.ok) {
                throw new Error('Error al obtener likes');
            }
            const data = await response.json();
            setCount(data.totalLikes); // Actualiza el contador de likes
            return data.users; // Retorna la lista de usuarios que dieron like
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    };


    const addUser = async (newUser) => {
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: newUser.email,
                    password: newUser.password,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    description: newUser.description,
                    seeking: newUser.seeking,
                    gender: newUser.gender,
                    age: newUser.age,
                    image: newUser.image
                })
            });

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error);
            }

            // Agregar el nuevo usuario al estado users
            const newUserWithId = {
                ...newUser,
                id: data.userId
            };
            setUsers(prevUsers => [...prevUsers, newUserWithId]);

            return data;
        } catch (error) {
            console.error('Error en el registro:', error);
            throw error;
        }
    };

    //Aqui va el estado para los usuarios que ya no se le mostraran al usuario cuando les da no me gusta
    const[hiddenUsers, setHiddenUsers] = useState([]);

    //hideUser es una función que toma un argumento llamado userId. Este userId representa el ID del usuario que se desea ocultar, esta función se llamará cuando el usuario haga clic en el botón "X" en la tarjeta de un usuario, indicando que no le gusta, userId es lo mismo que data.id, solo que se define en card esto, pero en el contexto se coloca userId para representar el Id del usuario.
    const hideUser=(userId)=> {

        //prev es un parametro que representa el array antes de ser modificado, La expresión ([...prev, userId]) crea un nuevo array que incluye todos los elementos del array anterior (prev) y agrega el nuevo userId al final.
        setHiddenUsers((prev)=> [...prev, userId]);
    }

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
            currentUser,
            fetchLikesCount,
            hiddenUsers,
            hideUser,
        }}>
            {children}
        </AppContext.Provider>
    );
};