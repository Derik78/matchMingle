const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

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

//Cuando un cliente envía una solicitud POST a esta URL, se ejecutará la función proporcionada.
app.post('/api/likes', (req, res) => {

    // Se extraen los valores id_usuario_dador y id_usuario_recibido del cuerpo de la solicitud (req.body). Estos valores son enviados por el cliente y representan los IDs de los usuarios involucrados en el "like".
    const { id_usuario_dador, id_usuario_recibido } = req.body;

    // Verificar que los IDs no sean nulos
    if (!id_usuario_dador || !id_usuario_recibido) {
        return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    const query = 'INSERT INTO likes (id_usuario_dador, id_usuario_recibido, creado_en) VALUES (?, ?, NOW())';
    
    // Se ejecuta la consulta utilizando el método db.query(), pasando la consulta y un array con los valores a insertar ([id_usuario_dador, id_usuario_recibido]).
    db.query(query, [id_usuario_dador, id_usuario_recibido], (err, results) => {
        if (err) {
            console.error('Error al insertar en likes:', err); // Muestra el error en la consola
            return res.status(500).json({ error: 'Error al registrar el like: ' + err.message });
        }
        res.json({ message: 'Like registrado', id: results.insertId });
    });
});

// Ruta para obtener los likes de un usuario
app.get('/api/likes/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT COUNT(*) AS totalLikes FROM likes WHERE id_usuario_recibido = ?';
    
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener likes:', err); // Muestra el error en la consola
            return res.status(500).json({ error: 'Error al obtener likes: ' + err.message });
        }
        res.json({ totalLikes: results[0].totalLikes });
    });
});

//userId es un parámetro de ruta que representa el ID del usuario que está recibiendo los "likes

//JOIN usuarios ON: Esta parte de la consulta une la tabla likes_recibidos con la tabla usuarios utilizando el campo id_usuario_dador. Esto significa que se está buscando información sobre el usuario que ha dado el "me gusta", al id_usuario_dador tener llave foranea con usuarios(id)

//WHERE: filtra los resultados para que solo se devuelvan los "likes" recibidos por el usuario cuyo ID se pasa como parámetro. El signo de interrogación (?) es un marcador de posición que se reemplazará por el valor de userId más adelante.
app.get('/api/likes_recibidos/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT usuarios.id, usuarios.first_name, usuarios.last_name, usuarios.image 
        FROM likes_recibidos 
        JOIN usuarios ON likes_recibidos.id_usuario_dador = usuarios.id
        WHERE likes_recibidos.id_usuario_recibido = ?`;

        //El segundo argumento es un array que tiene los valores que se le pasaran al (?) del WHERE
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener likes recibidos:', err);
            return res.status(500).json({ error: 'Error al obtener likes recibidos: ' + err.message });
        }
        res.json(results); // Devuelve la lista de usuarios que han dado like
    });
});

// Ruta para registrar un like
app.post('/api/likes_recibidos', (req, res) => {
    const { id_usuario_dador, id_usuario_recibido } = req.body;

    if (!id_usuario_dador || !id_usuario_recibido) {
        return res.status(400).json({ error: 'ID de usuario inválido' });
    }

     // Verificar si ya existe un like
     const checkQuery = 'SELECT * FROM likes_recibidos WHERE id_usuario_dador = ? AND id_usuario_recibido = ?';
    
     db.query(checkQuery, [id_usuario_dador, id_usuario_recibido], (err, results) => {
         if (err) {
             console.error('Error al verificar like existente:', err);
             return res.status(500).json({ error: 'Error al verificar like existente: ' + err.message });
         }
 
         // Si ya existe un like, no se inserta uno nuevo
         if (results.length > 0) {
             return res.status(400).json({ error: 'Ya has dado like a este usuario' });
         }

    //Esta línea define una consulta SQL para insertar un nuevo registro en la tabla likes_recibidos, utilizando los IDs de los usuarios que han dado y recibido el "like".
    const query = 'INSERT INTO likes_recibidos (id_usuario_dador, id_usuario_recibido) VALUES (?, ?)';
    
    db.query(query, [id_usuario_dador, id_usuario_recibido], (err, results) => {
        if (err) {
            console.error('Error al insertar en likes_recibidos:', err);
            return res.status(500).json({ error: 'Error al registrar el like: ' + err.message });
        }
            res.json({ message: 'Like registrado', id: results.insertId });
        });
    });
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});