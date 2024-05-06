// reiniciador-juego.js

// Importar las dependencias
const express = require('express');
const cors = require('cors'); // Importar el paquete cors

// Configurar la aplicación Express
const app = express();

// Utilizar el middleware cors
app.use(cors());

// Endpoint para reiniciar el juego y generar un nuevo número aleatorio
app.post('/reiniciar-juego', (req, res) => {
    const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    res.json({ mensaje: 'Se ha reiniciado el juego y se ha generado un nuevo número para adivinar.', numero: numeroAleatorio });
});

// Puerto en el que escucha el microservicio
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Reiniciador del juego en funcionamiento en el puerto ${PORT}`);
});
