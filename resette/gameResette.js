const express = require('express');
const cors = require('cors'); 
const fetch = require('node-fetch'); 

const app = express();

app.use(cors());

let numeroAleatorio;

async function obtenerNumeroAleatorio() {
    try {
        const response = await fetch('http://randomnumber:3001/generar-numero-aleatorio');
        const data = await response.json();
        return data.numero;
    } catch (error) {
        console.error('Error al obtener el número aleatorio:', error);
        throw error; 
    }
}

app.post('/reiniciar-juego', async (req, res) => {
    try {
        numeroAleatorio = await obtenerNumeroAleatorio(); 
        res.json({ mensaje: 'Se ha reiniciado el juego y se ha generado un nuevo número para adivinar.', numero: numeroAleatorio });
    } catch (error) {
        res.status(500).json({ error: 'Error al reiniciar el juego.' });
    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Reiniciador del juego en funcionamiento en el puerto ${PORT}`);
});