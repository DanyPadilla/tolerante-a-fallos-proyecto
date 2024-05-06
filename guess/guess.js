// manejador-conjeturas.js

// Importar las dependencias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar el paquete cors

// Configurar la aplicación Express
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Utilizar el middleware cors

let numeroSecreto;

// Endpoint para iniciar una nueva adivinanza
app.post('/iniciar-adivinanza', (req, res) => {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    res.json({ mensaje: 'Se ha generado un nuevo número para adivinar.' });
});

// Endpoint para enviar una conjetura y recibir el resultado
app.post('/adivinar', (req, res) => {
    const conjetura = req.body.conjetura;
    if (!conjetura || isNaN(conjetura)) {
        res.status(400).json({ error: 'La conjetura no es válida.' });
    } else {
        if (conjetura == numeroSecreto) {
            res.json({ mensaje: '¡Correcto! Has adivinado el número.' });
        } else if (conjetura < numeroSecreto) {
            res.json({ mensaje: 'Incorrecto. El número es mayor.' });
        } else {
            res.json({ mensaje: 'Incorrecto. El número es menor.' });
        }
    }
});

// Puerto en el que escucha el microservicio
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Manejador de conjeturas en funcionamiento en el puerto ${PORT}`);
});
