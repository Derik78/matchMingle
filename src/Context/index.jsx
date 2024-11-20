import React, { createContext, useState } from "react";
import mockUsers from '../Data/mockUsers';

export const AppContext = createContext()

/*AppProvider sirve para envolver otros componentes de tu aplicación y proporcionarles acceso*/
export const AppProvider= ({children}) => {
    const [count, setCount] = useState(0)
    const [isUserDetailOpen, setIsUsersDetailOpen] = useState(false)
    const [userToShow, setUserToShow] = useState({})
    const [users, setUsers] = useState(mockUsers)

    const OpenUserDetail = () => setIsUsersDetailOpen(true)
    const CloseUserDetail = () => setIsUsersDetailOpen(false)

    const validateUser = (email, password) => {
        return users.find(user => user.email === email && user.password === password)
    }

    return (
        <AppContext.Provider value={{
            count,
            setCount,
            OpenUserDetail,
            CloseUserDetail,
            isUserDetailOpen,
            userToShow,
            setUserToShow,
            users,
            validateUser,
        }}>
            {children}
        </AppContext.Provider>
    );
};

