import { useRoutes, BrowserRouter, Navigate, useLocation } from 'react-router-dom';
import Home from '../Home';
import MyAccount from '../MyAccount';
import Mensajes from '../Mensajes';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import Navbar from '../../Components/Navbar';
import React from 'react';
import './App.css';
import { AppProvider } from '../../Context';
import CreateAccount from '../CreateAccount';
import UsersDetail from '../../Components/UsersDetail';

const AppRoutes = () => {
    return useRoutes([
        { path: '/', element: <Navigate to="/SignIn" /> },
        { path: '/Home', element: <Home /> },
        { path: '/MyAccount', element: <MyAccount /> },
        { path: '/Mensajes', element: <Mensajes /> },
        { path: '/SignIn', element: <SignIn /> },
        { path: '/CreateAccount', element: <CreateAccount /> },
        { path: '/*', element: <NotFound /> },
    ]);
}

const App = () => {
    const location = useLocation();

    // Rutas donde no se debe mostrar el Navbar
    const noNavbarRoutes = ['/SignIn', '/CreateAccount'];

    return (
        <AppProvider>
            {/* Verifica si la ruta actual no está en el array de rutas sin Navbar */}
            {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
            <UsersDetail/>
            <AppRoutes />
        </AppProvider>
    );
}

export default App;

