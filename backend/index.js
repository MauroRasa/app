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
  database: 'usuarios',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

// Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// Actualizar un usuario por su ID
app.post('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, domicilio } = req.body;
  try {
    const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, domicilio = ? WHERE id = ?';
    db.query(sql, [nombre, apellido, domicilio, id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json({ message: 'Usuario actualizado exitosamente', id });
    });
    }catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al actualizar el usuario' });
    }
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
