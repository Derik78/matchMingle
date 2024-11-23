const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000; // Puedes cambiar el puerto si es necesario

// Middleware
app.use(cors());
app.use(express.json()); // Para poder recibir JSON en las solicitudes

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost', // Cambia esto si tu base de datos está en otro lugar
    user: 'root', // Cambia esto por tu usuario de MySQL
    password: 'leopardo7894', // Cambia esto por tu contraseña de MySQL
    database: 'matchm' // Nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Rutas de ejemplo
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});