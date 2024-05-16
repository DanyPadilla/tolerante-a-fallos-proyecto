// Importar las dependencias
const express = require('express');
const cors = require('cors'); // Importar el paquete cors
const fetch = require('node-fetch'); // Importar el paquete fetch para hacer solicitudes HTTP

// Configurar la aplicación Express
const app = express();

// Utilizar el middleware cors
app.use(cors());

let numeroAleatorio;

// Función para obtener un número aleatorio del microservicio de números aleatorios
async function obtenerNumeroAleatorio() {
    try {
        const response = await fetch('http://randomnumber:3001/generar-numero-aleatorio');
        const data = await response.json();
        return data.numero;
    } catch (error) {
        console.error('Error al obtener el número aleatorio:', error);
        throw error; // Propagar el error para manejarlo en el código que llama a esta función
    }
}

// Endpoint para reiniciar el juego y generar un nuevo número aleatorio
app.post('/reiniciar-juego', async (req, res) => {
    try {
        numeroAleatorio = await obtenerNumeroAleatorio(); // Obtener el nuevo número aleatorio del microservicio de números aleatorios
        res.json({ mensaje: 'Se ha reiniciado el juego y se ha generado un nuevo número para adivinar.', numero: numeroAleatorio });
    } catch (error) {
        res.status(500).json({ error: 'Error al reiniciar el juego.' });
    }
});

// Puerto en el que escucha el microservicio
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Reiniciador del juego en funcionamiento en el puerto ${PORT}`);
});
