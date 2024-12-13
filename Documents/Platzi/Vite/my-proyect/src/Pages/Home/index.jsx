import Layout from "../../Components/Layout" // Importa el componente Layout para estructurar la página
import Card from "../../Components/Card" // Importa el componente Card para mostrar cada usuario
import UsersDetail from '../../Components/UsersDetail'
import { useState, useEffect } from "react" // Importa hooks de React para manejar el estado y efectos

function Home() {
    // Inicializa el estado 'users' como un array vacío
    const [users, setUsers] = useState([]); // Esto significa que al principio no hay usuarios

    useEffect(() => {
        // Crear un array de usuarios ficticios
        const mockUsers = [
                { id: 1, name: { first: 'Juan', last: 'Pérez' }, age: 25, email: 'juan.perez@ejemplo.com', completed: false, likes: 0, gender: 'male', image: 'https://randomuser.me/api/portraits/men/1.jpg', description: 'Apasionado por la fotografía y el senderismo, siempre en busca de nuevas aventuras.', seeking: 'Relación' },
                { id: 2, name: { first: 'María', last: 'Gómez' }, age: 30, email: 'maria.gomez@ejemplo.com', completed: false, likes: 0, gender: 'female', image: 'https://randomuser.me/api/portraits/women/1.jpg', description: 'Amante de los animales y la cocina, disfruta de las pequeñas cosas en la vida.', seeking: 'Amistad' },
                { id: 3, name: { first: 'Carlos', last: 'López' }, age: 22, email: 'carlos.lopez@ejemplo.com', completed: false, likes: 0, gender: 'male', image: 'https://randomuser.me/api/portraits/men/2.jpg', description: 'Estudiante de ingeniería, le encanta aprender sobre tecnología y jugar fútbol.', seeking: 'Relación' },
                { id: 4, name: { first: 'Ana', last: 'Martínez' }, age: 28, email: 'ana.martinez@ejemplo.com', completed: false, likes: 0, gender: 'female', image: 'https://randomuser.me/api/portraits/women/2.jpg', description: 'Profesional en marketing, aficionada a los viajes y la lectura.', seeking: 'Amistad' },
                { id: 5, name: { first: 'Luis', last: 'Hernández' }, age: 35, email: 'luis.hernandez@ejemplo.com', completed: false, likes: 0, gender: 'male', image: 'https://randomuser.me/api/portraits/men/3.jpg', description: 'Amante de los deportes y de la buena comida, busca experiencias nuevas.', seeking: 'Relación' },
                { id: 6, name: { first: 'Laura', last: 'Ortiz' }, age: 27, email: 'laura.ortiz@ejemplo.com', completed: false, likes: 0, gender: 'female', image: 'https://randomuser.me/api/portraits/women/3.jpg', description: 'Diseñadora gráfica, apasionada por el arte y la naturaleza.', seeking: 'Amistad' },
                { id: 7, name: { first: 'Jorge', last: 'Ramírez' }, age: 40, email: 'jorge.ramirez@ejemplo.com', completed: false, likes: 0, gender: 'male', image: 'https://randomuser.me/api/portraits/men/4.jpg', description: 'Empresario y padre de dos, disfruta de la tranquilidad y el cine.', seeking: 'Relación' },
                { id: 8, name: { first: 'Sofía', last: 'Vargas' }, age: 33, email: 'sofia.vargas@ejemplo.com', completed: false, likes: 0, gender: 'female', image: 'https://randomuser.me/api/portraits/women/4.jpg', description: 'Médico, entusiasta del yoga y la meditación.', seeking: 'Amistad' },
                { id: 9, name: { first: 'Andrés', last: 'Castillo' }, age: 24, email: 'andres.castillo@ejemplo.com', completed: false, likes: 0, gender: 'male', image: 'https://randomuser.me/api/portraits/men/5.jpg', description: 'Desarrollador web y gamer, busca conocer gente con intereses similares.', seeking: 'Relación' },
                { id: 10, name: { first: 'Lucía', last: 'Mejía' }, age: 29, email: 'lucia.mejia@ejemplo.com', completed: false, likes: 0, gender: 'female', image: 'https://randomuser.me/api/portraits/women/5.jpg', description: 'Bióloga, apasionada por la naturaleza y la conservación.', seeking: 'Amistad' },
            
                // Nuevos usuarios
                { id: 11, name: { first: 'Miguel', last: 'Fernández' }, age: 26, email: 'miguel.fernandez@ejemplo.com', completed: false, likes: 0, gender: 'male', image: 'https://randomuser.me/api/portraits/men/6.jpg', description: 'Ingeniero de software, disfruta de la lectura de ciencia ficción.', seeking: 'Relación' },
                { id: 12, name: { first: 'Elena', last: 'Ruiz' }, age: 31, email: 'elena.ruiz@ejemplo.com', completed: false, likes: 0, gender: 'female', image: 'https://randomuser.me/api/portraits/women/6.jpg', description: 'Profesional en finanzas, fanática de la moda y el arte moderno.', seeking: 'Amistad' },
                { id: 13, name: { first: 'José', last: 'Díaz' }, age: 45, email: 'jose.diaz@ejemplo.com', completed: false, likes: 0, gender: 'male', image: 'https://randomuser.me/api/portraits/men/7.jpg', description: 'Chef, amante de la buena mesa y la música jazz.', seeking: 'Relación' },
                { id: 14, name: { first: 'Carla', last: 'Moreno' }, age: 37, email: 'carla.moreno@ejemplo.com', completed: false, likes: 0, gender: 'female', image: 'https://randomuser.me/api/portraits/women/7.jpg', description: 'Psicóloga, le gusta el teatro y la poesía.', seeking: 'Amistad' },
                { id: 15, name: { first: 'Diego', last: 'Santos' }, age: 29, email: 'diego.santos@ejemplo.com', completed: false, likes: 0, gender: 'male', image: 'https://randomuser.me/api/portraits/men/8.jpg', description: 'Arquitecto, apasionado por el diseño sostenible.', seeking: 'Relación' },
                { id: 16, name: { first: 'Fernanda', last: 'Paredes' }, age: 23, email: 'fernanda.paredes@ejemplo.com', completed: false, likes: 0, gender: 'female', image: 'https://randomuser.me/api/portraits/women/8.jpg', description: 'Estudiante de medicina, le gusta el senderismo y la fotografía.', seeking: 'Amistad' },
                { id: 17, name: { first: 'Pablo', last: 'Torres' }, age: 38, email: 'pablo.torres@ejemplo.com', completed: false, likes: 0, gender: 'male', image: 'https://randomuser.me/api/portraits/men/9.jpg', description: 'Abogado, disfruta del tenis y los viajes.', seeking: 'Relación' },
                { id: 18, name: { first: 'Valeria', last: 'Mendoza' }, age: 32, email: 'valeria.mendoza@ejemplo.com', completed: false, likes: 0, gender: 'female', image: 'https://randomuser.me/api/portraits/women/9.jpg', description: 'Profesional en relaciones internacionales, amante de la música clásica.', seeking: 'Amistad' },
                { id: 19, name: { first: 'Raúl', last: 'García' }, age: 36, email: 'raul.garcia@ejemplo.com', completed: false, likes: 0, gender: 'male', image: 'https://randomuser.me/api/portraits/men/10.jpg', description: 'Veterinario, amante de los animales y el ciclismo.', seeking: 'Relación' },
                { id: 20, name: { first: 'Isabel', last: 'Ríos' }, age: 34, email: 'isabel.rios@ejemplo.com', completed: false, likes: 0, gender: 'female', image: 'https://randomuser.me/api/portraits/women/10.jpg', description: 'Artista plástica, apasionada por el arte abstracto.', seeking: 'Amistad' }
            
];

        setUsers(mockUsers); // Establece el estado 'users' con el array de usuarios ficticios
    }, []); // El array vacío significa que este efecto solo se ejecuta una vez al montar el componente

    return (
        <Layout>
            Home
            <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
            {
                users.map(user => ( // Itera sobre cada usuario en el array 'users'
                    <Card key={user.id.value} data={user} /> // Renderiza un componente Card para cada usuario
                ))
            }
            </div>
            <UsersDetail/>
        </Layout>
    );
}

export default Home; // Exporta el componente Home para que pueda ser utilizado en otras partes de la aplicación