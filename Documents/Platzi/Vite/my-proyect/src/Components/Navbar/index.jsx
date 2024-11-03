import { useContext } from "react";
import { HeartIcon } from '@heroicons/react/24/solid'
import { NavLink } from "react-router-dom";
import {AppContext} from '../../Context'

const Navbar = () => {

    const context = useContext(AppContext)
    const activeStyle = "underline underline-offset-4"

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 font-light text-md">
            <ul className="flex items-center gap-5">
                <li className="font-semibold text-lg">


                {/* Cada NavLink tiene un atributo to que define la ruta a la que se debe redirigir cuando se hace clic en el enlace. */} 
                    <NavLink 
                    to='/' >
                        MatchMingle
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/'
                    className={({isActive}) => isActive ? activeStyle : undefined}>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/clothes'
                    className={({isActive}) => isActive ? activeStyle : undefined}>
                        Clothes
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/electronics'
                    className={({isActive}) => isActive ? activeStyle : undefined}>
                        Electronics
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/fornitures'
                    className={({isActive}) => isActive ? activeStyle : undefined}>
                        Fornitures
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/toys'
                    className={({isActive}) => isActive ? activeStyle : undefined}>
                        Toys
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/others'
                    className={({isActive}) => isActive ? activeStyle : undefined}>
                        Others
                    </NavLink>
                </li>
            </ul>

            <ul className="flex items-center gap-5">
                <li className="text-blue-400">
                   londono.derik2004@gmail.com
                </li>

                <li>
                    <NavLink to='/MyOrders'
                    className={({isActive}) => isActive ? activeStyle : undefined}>
                        My orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/MyAccount'
                    className={({isActive}) => isActive ? activeStyle : undefined}>
                        My Account
                    </NavLink>
                </li>

                <li className="flex items-center">
                    <HeartIcon className='h-6 w-6 text-red-500 mr-1 align-middle' /> {context.count}
                </li>

                <li>
                    <NavLink to='/SignIn'
                    className={({isActive}) => isActive ? activeStyle : undefined}>
                        Sign In
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar 