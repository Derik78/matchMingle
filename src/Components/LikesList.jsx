import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context';

const LikesList = ({onClose}) => {
    const { currentUser } = useContext(AppContext);

    //Define un estado local likedUsers que almacenará la lista de usuarios que han dado "like" al usuario actual.
    const [likedUsers, setLikedUsers] = useState([]);


    //Se usa useEffect cada vez que currentUser cambia
    useEffect(() => {
        const fetchLikedUsers = async () => {

            //Aqui intenta hacer conexion con la API de la base de datos de likes, 
            try {

                //Aquí se realiza una solicitud HTTP GET a la API utilizando la función fetch, La URL incluye el ID del usuario actual (currentUser.id), que se utiliza para obtener los "likes" específicos de ese usuario.
                const response = await fetch(`http://localhost:3000/api/likes_recibidos/${currentUser.id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener usuarios que te han dado like');
                }
                const data = await response.json();
                setLikedUsers(data);
            } catch (error) {
                console.error('Error:', error); 
            }
        };

        // Solo se ejecuta si hay un usuario actual
        if (currentUser) {
            fetchLikedUsers();
        }
        //[currentUser]: Este array especifica las dependencias del efecto, se ejecutará cada vez que currentUser cambie. Esto es útil para asegurarse de que siempre se obtengan los "likes" del usuario correcto cuando el usuario actual cambie.
    }, [currentUser]);

    console.log(likedUsers);

    return (
        <div className="absolute right-0 mt-20 top-11 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out">
            <h3 className="p-4 font-semibold text-xl text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-lg">
                Usuarios que te han dado Me gusta
            </h3>
            <button onClick={onClose} className='text-black'>X</button>
            <ul className="max-h-80 overflow-y-auto p-2">
                {likedUsers.length > 0 ? (
                    likedUsers.map(user => (
                        <li key={user.id} className="flex items-center p-2 hover:bg-gray-100 transition-colors duration-200 rounded-lg">
                            <img src={user.image || 'default-avatar.png'} alt={`${user.first_name} ${user.last_name}`} className="w-12 h-12 rounded-full mr-2" />
                            <span className="font-medium">{user.first_name} {user.last_name}</span>
                        </li>
                    ))
                ) : (
                    <li className="p-2 text-gray-500 text-center">No hay usuarios que te hayan dado like.</li>
                )}
            </ul>
        </div>
    );
}

export default LikesList;