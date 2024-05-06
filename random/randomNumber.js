const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar CORS
app.use(cors());

// Generar un número aleatorio entre 1 y 100
const generarNumeroAleatorio = () => {
    return Math.floor(Math.random() * 100) + 1;
};

// Endpoint para generar un nuevo número aleatorio
app.get('/generar-numero-aleatorio', (req, res) => {
    const numeroAleatorio = generarNumeroAleatorio();
    res.json({ numero: numeroAleatorio });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Generador de números aleatorios en funcionamiento en el puerto ${PORT}`);
});
