import { useContext } from "react";
import { HeartIcon, XMarkIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { AppContext } from '../../Context';
import { likeUser } from '../../api'; // Asegúrate de importar la función likeUser
import { useNavigate } from 'react-router-dom';

const Card = ({ data }) => {
    const context = useContext(AppContext);
    const navigate = useNavigate();

     //Cuando se hace clic en una tarjeta (Card), se llama a showUser, que a su vez llama a setUserToShow con userDetail (que contiene la información del usuario correspondiente a esa tarjeta). Esto actualiza el estado userToShow en el contexto con la información del usuario seleccionado.
     const showUser =(userDetail) => {
        console.log("Mostrando usuario:", userDetail); // Verifica que se esté llamando correctamente
        context.OpenUserDetail()
        context.setUserToShow(userDetail)
    }

    const handleLike = async () => {
        console.log('ID del usuario que da like:', context.currentUser.id); // Verifica el ID del dador
        console.log('ID del usuario que recibe like:', data.id); // Verifica el ID del receptor

        //Llamada a la API: Se llama a la función likeUser (definida en src/api/index.jsx), que envía una solicitud POST a la API para registrar el "like".
        try {
            const result = await likeUser(context.currentUser.id, data.id);
            console.log('Like registrado:', result);
            //Despues de haberle pasado data.id como parametros este los tomará y cambiará userId como data.id
            context.fetchLikesCount(data.id); // Actualiza el conteo de likes para el usuario que recibió el "like"
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleHide = () => {
        context.hideUser(data.id);
    }

    return (
        <div className="bg-white cursor-pointer w-full h-60 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" onClick={()=>showUser(data)}>
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-2 px-3 py-0.5">{data.age}</span>
                <img className="h-full w-full object-cover rounded-lg" src={data.image} alt={`${data.first_name || ''} ${data.last_name || ''}`} />
            </figure>
            <div className="flex justify-between p-2">
                <span className="text-sm">{data.first_name ? `${data.first_name} ${data.last_name}` : 'Nombre no disponible'}</span>
                <div className="flex items-center space-x-2" style={{ transform: 'translateY(-5px)' }}>
                    <button className="p-1 rounded-full hover:bg-gray-200" onClick={handleLike}>
                        <HeartIcon className="h-6 w-6 text-red-500" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-200">
                        <XMarkIcon className="h-6 w-6 text-gray-800" onClick={handleHide}/>
                    </button>
                    <button 
                        className="p-1 rounded-full hover:bg-gray-200"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/mensajes?chat=${data.id}`);
                        }}
                    >
                        <ChatBubbleLeftIcon className="h-6 w-6 text-blue-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;