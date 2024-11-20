import React, { useContext } from 'react';
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import { AppContext } from '../../Context'; // Importa el contexto
import UsersDetail from '../../Components/UsersDetail'; // Asegúrate de importar UsersDetail

function Home() {
    const { users } = useContext(AppContext); // Obtén la lista de usuarios del contexto

    return (
        <Layout>
           
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-lg mx-auto">
                {users.length > 0 ? ( // Verifica si hay usuarios
                    users.map(user => (
                        <Card key={user.id} data={user} />
                    ))
                ) : (
                    <p>No hay usuarios disponibles.</p> // Mensaje si no hay usuarios
                )}
            </div>
            <UsersDetail />
        </Layout>
    );
}

export default Home;