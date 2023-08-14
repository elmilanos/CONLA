// Módulo mongoose importado
const mongoose = require('mongoose');

// Importa la configuración de la db desde keys.js
const { mongodb } = require('./keys');

// Conexión a MongoDB
mongoose.connect(mongodb.URI, {})  // Conectar utilizando la URI de keys.js
    .then(db => console.log('Connected to Mongo'))  // Conexión exitosa
    .catch(err => console.error(err));  // Conexión fallida
