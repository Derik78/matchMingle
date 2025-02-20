// Función para obtener usuarios desde la API
export const fetchUsersFromAPI = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/usuarios'); // URL de tu API
        if (!response.ok) {
            throw new Error('Error al obtener usuarios'); // Manejo de errores
        }
        const data = await response.json(); // Convierte la respuesta a JSON
        return data; // Devuelve los datos obtenidos
    } catch (error) {
        console.error('Error:', error); // Muestra el error en la consola
        return []; // Devuelve un array vacío en caso de error
    }
};


//Envía una solicitud POST a la ruta /api/likes del servidor, incluyendo los IDs de los usuarios en el cuerpo de la solicitud.
// Función para dar "me gusta" (actualizada)
export const likeUser = async (id_usuario_dador, id_usuario_recibido) => {
    try {
        const response = await fetch('http://localhost:3000/api/likes_recibidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario_dador,
                id_usuario_recibido,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al dar like');
        }

        const result = await response.json();
        return result; // Devuelve el resultado de la operación
    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanza el error para que pueda ser manejado en el componente
    }
};

// Función para obtener el conteo de "me gusta" de un usuario (actualizada)
export const fetchLikesCount = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/likes_recibidos/${userId}`);
        if (!response.ok) {
            throw new Error('Error al obtener likes');
        }
        const data = await response.json();
        return {
            totalLikes: data.length, // Cambia esto si necesitas un conteo diferente
            users: data
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};