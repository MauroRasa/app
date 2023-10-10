const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); // Middleware para analizar solicitudes JSON

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

app.post('/api/usuariosprincipal', (req, res) => {
  const { usuario, email, password } = req.body;

  // Verificar que todos los campos estén presentes
  if (!usuario || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realizar la consulta SQL para insertar el usuario en la base de datos
  const sql = 'INSERT INTO usuariosprincipal (usuario, email, password) VALUES (?, ?, ?)';
  db.query(sql, [usuario, email, password], (err, result) => {
    if (err) {
      console.error('Error al insertar usuario en la base de datos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    console.log('Usuario insertado correctamente');
    res.status(201).json({ message: 'Usuario insertado correctamente' });
  });
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
