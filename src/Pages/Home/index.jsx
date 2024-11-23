import React, { useContext, useEffect } from 'react';
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import { AppContext } from '../../Context';
import UsersDetail from '../../Components/UsersDetail';

function Home() {
    const { users } = useContext(AppContext); // Obtén la lista de usuarios del contexto

    // Imprimir los usuarios en la consola para verificar la estructura
    useEffect(() => {
        console.log(users);
    }, [users]);

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