import { XMarkIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/solid';
import './style.css';
import { useContext } from 'react';
import { AppContext } from '../../Context';

const UsersDetail = () => {
    const context = useContext(AppContext);

    const userToShow = context.userToShow || { name: { first: '', last: '' }, image: '', description: '' }; // Valor por defecto

    if (!context.isUserDetailOpen) {
        return null; // No renderiza nada si no se debe mostrar el detalle
    }

    return (
        <aside className={`${context.isUserDetailOpen ? 'flex' : 'hidden'} user-detail flex-col fixed right-0 border border-gray-300 rounded-lg bg-white shadow-lg p-4 transition-all duration-300`}>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='font-medium text-xl text-gray-800'>Descripción</h2>
                <button onClick={() => context.CloseUserDetail()} className='text-gray-600 hover:text-gray-800'>
                    <XMarkIcon className='h-6 w-6' />
                </button>
            </div>

            <figure className='mb-4'>
                <img className='h-48 w-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105' src={userToShow.image} alt={`${userToShow.name.first} ${userToShow.name.last}`} />
            </figure>

            <p className='text-gray-700'>
                <span className='font-semibold'>{userToShow.name.first} {userToShow.name.last}</span>
                <br/>
                <span>{userToShow.description}</span>
            </p>

            <div className="flex justify-between items-center mt-4"> {/* Contenedor para los botones */}
                <button className='flex items-center p-2 rounded-full bg-red-500 hover:bg-red-600 transition duration-200'>
                    <HeartIcon className='h-6 w-6 text-white' />
                </button>
                <button onClick={() => context.CloseUserDetail()} className='flex items-center p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition duration-200'>
                    <XMarkIcon className='h-6 w-6 text-gray-800' />
                </button>
            </div>
        </aside>
    );
}

export default UsersDetail;

