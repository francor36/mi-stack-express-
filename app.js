const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// 🧩 Configuración de base de datos desde variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'db',       // nombre del servicio del contenedor MySQL
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'mi_base'
});

// 🧠 Conexión a la base de datos
db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar con MySQL:', err);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint de prueba
app.get('/api', (req, res) => {
  res.json({ mensaje: '¡Hola desde Express en Docker con MySQL!' });
});

// Ejemplo: consultar algo desde la BD
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT NOW() AS fecha_actual', (err, resultados) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(resultados);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
