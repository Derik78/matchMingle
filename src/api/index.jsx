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