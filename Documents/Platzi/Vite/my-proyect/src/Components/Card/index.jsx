import { useContext } from "react"
import { HeartIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { AppContext } from '../../Context'

const Card = ({ data }) => {
    const context = useContext(AppContext)


    //Cuando se hace clic en una tarjeta (Card), se llama a showUser, que a su vez llama a setUserToShow con userDetail (que contiene la información del usuario correspondiente a esa tarjeta). Esto actualiza el estado userToShow en el contexto con la información del usuario seleccionado.
    const showUser =(userDetail) => {
        context.OpenUserDetail()
        context.setUserToShow(userDetail)
    }
    return (
        <div className="bg-white cursor-pointer w-56 h-60 rounded-lg" onClick={()=>showUser(data)}>
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-2 px-3 py-0.5">{data.age}</span>
                <img className="h-full w-full object-cover rounded-lg" src={data.image} alt={`${data.name.first} ${data.name.last}`} />
                <button className="absolute top-0 right-0 flex justify-center items-center bg-white h-6 w-6 rounded-full m-2 p-1" onClick={() => context.setCount(context.count + 1)}>
                    +
                </button>
            </figure>
            <p className="flex justify-between">
                <span className="text-sm">{data.name.first} {data.name.last}</span>
                <div className="flex gap-2"> {/* Contenedor para los botones */}
                    <button>
                        <HeartIcon className='h-6 w-6 text-red-500'></HeartIcon>
                    </button>
                    <button>
                        <XMarkIcon className='h-6 w-6 text-gray-700'></XMarkIcon>
                    </button>
                </div>
            </p>
        </div>
    )
}

export default Card