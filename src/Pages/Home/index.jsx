import React, { useContext, useEffect } from 'react';
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import { AppContext } from '../../Context';
import UsersDetail from '../../Components/UsersDetail';
import MatchList from '../../Components/MatchList';

function Home() {
    const { users, currentUser, hiddenUsers } = useContext(AppContext); // Obtén la lista de usuarios del contexto

    // Imprimir los usuarios en la consola para verificar la estructura
    useEffect(() => {
        console.log(users);
    }, [users]);

    //filter es un metodo que crea un nuevo array que incluye solo los elementos que cumplen la condicion, en este caso será que su id sea diferente al de current user, el ? significa que si es undefined o null no va a crashear
    const filteredUsers = users.filter (user => user.id !== currentUser?.id && !hiddenUsers.includes(user.id));

    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-screen-xl mx-auto p-4">
                <div className="md:col-span-3">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <Card key={user.id} data={user} />
                            ))
                        ) : (
                            <p>No hay usuarios disponibles.</p>
                        )}
                    </div>
                </div>
                <div className="md:col-span-1">
                    <MatchList />
                </div>
            </div>
            <UsersDetail />
        </Layout>
    );
}

export default Home;