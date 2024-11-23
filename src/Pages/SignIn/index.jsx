import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../Context';
import logo from '../../logo/logo-matchmingle.png';
import './styles.css';

function LoginForm() {
    const navigate = useNavigate();
    const { validateUser } = useContext(AppContext); // Obtén la función de validación del contexto
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Verificar si el correo y la contraseña son válidos
        const user = validateUser(email, password);

        if (user) {
            navigate('/Home'); // Redirige a la página de perfiles después de iniciar sesión
        } else {
            setError('Correo electrónico o contraseña incorrectos.'); // Muestra un mensaje de error
        }
    };

    return (
        <div className="login">
            <div className="form-container">
                <img src={logo} alt="Logo" className="logo" />
                
                <h1 className="title">Bienvenido a MatchMingle</h1>
                <p className="subtitle">Ingresa tu cuenta para iniciar</p>
                
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="login" className="label">Nombre de usuario o correo</label>
                    <input 
                        type="text"  
                        id="login"
                        placeholder="Usuario" 
                        className="input input-login"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del correo
                    />

                    <label htmlFor="password" className="label">Contraseña</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="******" 
                        className="input input-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
                    />

                    {error && (
                        <p style={{
                            color: 'red', // Color del texto del mensaje de error
                            fontSize: '14px', // Tamaño de fuente
                            textAlign: 'center', // Centrar el texto
                            marginTop: '10px', // Espaciado superior
                            backgroundColor: 'rgba(255, 0, 0, 0.1)', // Fondo semitransparente
                            border: '1px solid red', // Borde rojo
                            borderRadius: '5px', // Bordes redondeados
                            padding: '10px' // Espaciado interno
                        }}>
                            {error}
                        </p>
                    )} {/* Muestra el mensaje de error */}

                    <button type="submit" className="primary-button login-button">
                        Ingresar
                    </button>

                    <p className="footer">
                        ¿Olvidaste tu contraseña? <Link to="/password-reset">Recordar</Link>
                    </p>

                    <p className="footer text-center text-sm text-gray-600 mt-4">
                    ¿No tienes una cuenta?{" "}
                    <Link
                        to="/CreateAccount"
                        className="text-blue-500 font-semibold hover:underline hover:text-blue-700 transition-colors duration-300"
                    >
                        Crear cuenta
                    </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;