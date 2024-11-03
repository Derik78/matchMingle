
import { createContext, useState } from "react";


export const AppContext = createContext()

/*AppProvider sirve para envolver otros componentes de tu aplicación y proporcionarles acceso*/
export const AppProvider= ({children}) => {
    const [count, setCount] = useState(0)

    //User Detail Open/Close
    const [isUserDetailOpen, setIsUsersDetailOpen] = useState(false)
    const OpenUserDetail = () => setIsUsersDetailOpen(true)
    const CloseUserDetail = () => setIsUsersDetailOpen(false)

    const [userToShow, setUserToShow] = useState({});

    return (
        <AppContext.Provider value={{
            count,
             setCount,
             OpenUserDetail,
             CloseUserDetail,
             isUserDetailOpen,
             userToShow,
             setUserToShow

        }}>
            {children}
        </AppContext.Provider>
    )
    
}  

