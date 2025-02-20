import { useContext } from "react"
import Layout from "../../Components/Layout"
import { AppContext } from "../../Context"
import './styles.css'

import React from "react"

const  Myaccount = () => {
    const {currentUser} = useContext(AppContext)

    return(
        <div className="my_account_constructor"> 
            <h1 className="title">Mi cuenta</h1>
            {currentUser ? (
                <div className="user_info">
                    <img src={currentUser.image || 'default-avatar.png'} alt="Foto de perfil" className="profile_pic"/>
                    <h2 className="name">{currentUser.first_name} {currentUser.last_name}</h2>
                    <p className="description">{currentUser.description}</p>
                    <p className="seeking">Buscando: {currentUser.seeking}</p>

            
                </div>
       ) : (
        <p className="no_user">No hay información del usuario disponible.</p>
    )}
</div>
);
};

export default Myaccount