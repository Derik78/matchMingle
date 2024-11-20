import { useContext } from "react";
import { HeartIcon } from '@heroicons/react/24/solid';
import { NavLink } from "react-router-dom";
import { AppContext } from '../../Context';

const Navbar = () => {
    const context = useContext(AppContext);
    const activeStyle = "underline underline-offset-4";

    return (
        <nav className="flex justify-between items-center w-full py-5 px-8 font-light text-md bg-white">
            <ul className="flex items-center gap-5">
                <li className="font-semibold text-lg">
                    <NavLink to='/'>
                        MatchMingle
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/'
                        className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Inicio
                    </NavLink>
                </li>
            </ul>

            <ul className="flex items-center gap-5">
                <li className="text-blue-400">
                    londono.derik2004@gmail.com
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
                    <HeartIcon className='h-6 w-6 text-red-500 mr-1 align-middle' /> {context.count}
                </li>
                <li>
                    <NavLink to='/SignIn'
                        className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Salir
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;