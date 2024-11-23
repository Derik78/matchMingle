import { useContext } from "react"
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { AppContext } from '../../Context'

const Card = ({ data }) => {
    const context = useContext(AppContext)


    //Cuando se hace clic en una tarjeta (Card), se llama a showUser, que a su vez llama a setUserToShow con userDetail (que contiene la información del usuario correspondiente a esa tarjeta). Esto actualiza el estado userToShow en el contexto con la información del usuario seleccionado.
    const showUser =(userDetail) => {
        console.log("Mostrando usuario:", userDetail); // Verifica que se esté llamando correctamente
        context.OpenUserDetail()
        context.setUserToShow(userDetail)
    }

    return (
        <div className="bg-white cursor-pointer w-full h-60 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" onClick={() => showUser(data)}>
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-2 px-3 py-0.5">{data.age}</span>
                <img className="h-full w-full object-cover rounded-lg" src={data.image} alt={`${data.first_name || ''} ${data.last_name || ''}`} />
            </figure>
            <div className="flex justify-between p-2">
                <span className="text-sm">{data.first_name ? `${data.first_name} ${data.last_name}` : 'Nombre no disponible'}</span>
                <div className="flex items-center space-x-2" style={{ transform: 'translateY(-5px)' }}>
                    <button className="p-1 rounded-full hover:bg-gray-200">
                        <HeartIcon className="h-6 w-6 text-red-500" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-200">
                        <XMarkIcon className="h-6 w-6 text-gray-800" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;