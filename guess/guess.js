const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const amqp = require('amqplib');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let numeroSecreto;

// Función para recibir el número aleatorio de RabbitMQ
async function recibirNumeroAleatorio() {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        const queue = 'numeros_aleatorios';

        await channel.assertQueue(queue, { durable: true });
        channel.consume(queue, (msg) => {
            const numeroAleatorio = parseInt(msg.content.toString(), 10);
            console.log(`Número aleatorio recibido: ${numeroAleatorio}`);
            numeroSecreto = numeroAleatorio;
            channel.ack(msg);
        });

        console.log('Esperando a recibir un número aleatorio...');
    } catch (error) {
        console.error('Error al conectar con RabbitMQ:', error);
    }
}

recibirNumeroAleatorio();

app.post('/iniciar-adivinanza', (req, res) => {
    if (numeroSecreto) {
        res.status(200).json({ mensaje: 'El juego ha sido iniciado.' });
    } else {
        res.status(400).json({ error: 'Error al iniciar el juego. No se recibió un número secreto.' });
    }
});

app.post('/adivinar', (req, res) => {
    const { conjetura } = req.body;
    if (!numeroSecreto) {
        res.status(400).json({ error: 'El juego no ha sido iniciado.' });
    } else if (conjetura === undefined || isNaN(conjetura)) {
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

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Manejador de conjeturas en funcionamiento en el puerto ${PORT}`);
});
