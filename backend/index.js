const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); // Middleware para analizar solicitudes JSON


// Configuración del middleware de sesión
app.use(
  session({
    secret: 'secreto_super_seguro', // Cambiar esto por un secreto más seguro
    resave: false,
    saveUninitialized: true,
  })
);

const secretKey = 'secreto_para_jwt';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'fitplangains',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

app.post('/api/usuarios', (req, res) => {
  const { usuario, email, Pass} = req.body;

  // Verificar que todos los campos estén presentes
  if (!usuario || !email || !Pass) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realizar la consulta SQL para insertar el usuario en la base de datos
  const sql = 'INSERT INTO usuarios (usuario, email, Pass, Img_u) VALUES (?, ?, ?, ?)';
  db.query(sql, [usuario, email, Pass, 'default.jpg'], (err, result) => {
    if (err) {
      console.error('Error al insertar usuario en la base de datos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    console.log('Usuario insertado correctamente');
    res.status(201).json({ message: 'Usuario insertado correctamente' });
  });
});






// Función para generar un token único para el usuario
function generateUserToken(username) {
  // Generar un token JWT con la clave secreta
  const token = jwt.sign({ username: username }, secretKey);
  return token;
}








// Ruta para verificar la autenticidad del token
app.post('/api/verifyToken', (req, res) => {
  const { userToken } = req.headers;

  if (!userToken) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(userToken, secretKey); // Verificar el token utilizando la clave secreta

    if (decoded && req.session.user === decoded.username) {
      return res.status(200).json({ message: 'Token válido' });
    } else {
      return res.status(401).json({ error: 'Token no válido' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Token no válido' });
  }
});









app.post('/api/login', (req, res) => {
  const { usuario, Pass } = req.body;

  // Verificar que todos los campos estén presentes
  if (!usuario || !Pass) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realizar la consulta SQL para verificar las credenciales del usuario en la base de datos
  const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND Pass = ?';
  db.query(sql, [usuario, Pass], (err, result) => {
    if (err) {
      console.error('Error al buscar usuario en la base de datos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (result.length > 0) {
      // Las credenciales son correctas, el usuario existe
      // Generar un token único y enviarlo al cliente
      const userToken = generateUserToken(usuario);
      req.session.user = usuario;
      res.status(200).json({ message: 'Inicio de sesión exitoso ', userToken });
    } else {
      // Las credenciales son incorrectas, el usuario no existe o las credenciales no coinciden
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });
});
// ...

app.get('/api/logout', (req, res) => {
  // Destruir la sesión en el logout
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al destruir la sesión:', err);
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.status(200).json({ message: 'Sesión destruida' });
  });
});







app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
