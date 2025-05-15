import React, { useState, useContext } from 'react';
import { AppContext } from '../../Context'; // Importa el contexto

function CreateAccount() {
    const { addUser } = useContext(AppContext); // Función addUser del contexto
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [description, setDescription] = useState('');
    const [relationshipType, setRelationshipType] = useState('Amistad'); // 'friendship' o 'relationship'
    const [photo, setPhoto] = useState(null); // Para almacenar la foto
    const [error, setError] = useState(''); // Para manejar errores
    const [success, setSuccess] = useState(''); // Para manejar mensajes de éxito

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newUser = {
            first_name,
            last_name,
            email,
            password,
            description,
            seeking: relationshipType,
            gender: 'male',
            age: 18,
            image: photo ? URL.createObjectURL(photo) : ''
        };

        try {
            const response = await addUser(newUser);
            if (response.success) {
                setSuccess('Usuario creado exitosamente');
                // Limpiar campos
                setEmail('');
                setPassword('');
                setFirst_name('');
                setLast_name('');
                setDescription('');
                setPhoto(null);
            } else {
                setError('Error al crear el usuario');
            }
        } catch (err) {
            console.error('Error al agregar usuario:', err);
            setError(err.message || 'Error al crear la cuenta. Inténtalo de nuevo.');
        }
    };

    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Crear Cuenta</h2>
            {error && <p className="text-red-500">{error}</p>} {/* Muestra mensaje de error */}
            {success && <p className="text-green-500">{success}</p>} {/* Muestra mensaje de éxito */}

            <label className="block mb-2">Correo Electrónico:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border rounded p-2 mb-4 w-full" />

            <label className="block mb-2">Contraseña:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border rounded p-2 mb-4 w-full" />

            <label className="block mb-2">Nombre:</label>
            <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} required className="border rounded p-2 mb-4 w-full" />

            <label className="block mb-2">Apellido:</label>
            <input type="text" value={last_name} onChange={(e) => setLast_name(e.target.value)} required className="border rounded p-2 mb-4 w-full" />

            <label className="block mb-2">Descripción:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="border rounded p-2 mb-4 w-full" />
                
            <label className="block mb-2">Tipo de Relación:</label>
            <select value={relationshipType} onChange={(e) => setRelationshipType(e.target.value)} className="border rounded p-2 mb-4 w-full">
                <option value="friendship">Amistad</option>
                <option value="relationship">Relación</option>
            </select>
            <label className="block mb-2">Foto de Perfil:</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="mb-4" />
            <button type="submit" className="bg-blue-500 text-white rounded p-2">Crear Cuenta</button>
        </form>
    );
}

export default CreateAccount;