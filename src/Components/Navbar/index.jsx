import { useContext, useState, useEffect } from "react";
import { HeartIcon } from '@heroicons/react/24/solid';
import { NavLink } from "react-router-dom";
import { AppContext } from '../../Context';
import LikesList from "../LikesList";

const Navbar = () => {
    const context = useContext(AppContext);
    const activeStyle = "underline underline-offset-4";
    const [showLikes, setShowLikes] = useState(false);


    // Esta es una función que se define para alternar el valor de showLikes. Cuando se llama a esta función, se invierte el valor actual de showLikes.
    const toggleLikesList = () => {
        setShowLikes(!showLikes);
    };

    // Efecto para obtener el conteo de likes recibidos
    useEffect(() => {
        const fetchLikesCount = async () => {
            if (context.currentUser) {
                const response = await fetch(`http://localhost:3000/api/likes_recibidos/${context.currentUser.id}`);
                if (response.ok) {
                    const data = await response.json();
                    context.setCount(data.length); // Actualiza el contador de likes
                }
            }
        };

        fetchLikesCount();
    }, [context.currentUser]); // Se ejecuta cada vez que currentUser cambia

    return (
        <nav className="flex justify-between items-center w-full py-5 px-8 font-light text-md bg-white">
            <ul className="flex items-center gap-5">
                <li className="font-semibold text-lg">
                    <NavLink to='/Home'>
                        MatchMingle
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/Home'
                        className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Inicio
                    </NavLink>
                </li>
            </ul>

            <ul className="flex items-center gap-5">
                <li className="text-blue-400">
                    {context.currentUser?.email} {/* Muestra el email del usuario actual */}
                </li>
                <li>
                    <NavLink to='/Mensajes'
                        className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Mensajes
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/MyAccount'
                        className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Mi cuenta
                    </NavLink>
                </li>
                <li className="flex items-center">
                    <button onClick={toggleLikesList} className="flex items-center">
                        <HeartIcon className='h-6 w-6 text-red-500 mr-1 align-middle' />
                        {context.count} {/* Muestra el contador de likes */}
                    </button>
                </li>
                <li>
                    <NavLink to='/SignIn'
                        className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Salir
                    </NavLink>
                </li>
            </ul>

            {/*Esta línea utiliza el valor de showLikes para decidir si se debe renderizar el componente LikesList.*/}
            {showLikes && <LikesList onClose={toggleLikesList} />} 
        </nav>
    );
}

export default Navbar;