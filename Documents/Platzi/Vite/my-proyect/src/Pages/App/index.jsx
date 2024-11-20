import {useRoutes, BrowserRouter} from 'react-router-dom'
import Home from '../Home'
import MyAccount from '../Myaccount'
import Myorder from '../Myorder'
import Myorders from '../Myorders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import React from 'react'
import './App.css'
import {AppProvider} from '../../Context'


{/*Cuando se renderiza AppRoutes, este componente evalúa la URL actual y determina qué componente debe mostrarse en función de las rutas que has definido. Por ejemplo, si la URL es /MyAccount, AppRoutes renderizará el componente MyAccount.*/}
const AppRoutes = () => {
    let routes= useRoutes([
        {path: '/', element:  <Home/>},
        {path: '/MyAccount', element:  <MyAccount/>},
        {path: '/Myorder', element:  <Myorder/>},
        {path: '/Myorders', element:  <Myorders/>},
        {path: '/*', element:  <NotFound/>},
        {path: '/SignIn', element:  <SignIn/>}
    ])

    return routes
}

const App =() => {
    return(

    <AppProvider>
        <BrowserRouter>
        <AppRoutes/>
        <Navbar/>
       </BrowserRouter>
    </AppProvider>
       
    )

}

export default App