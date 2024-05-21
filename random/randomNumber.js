const express = require('express');
const cors = require('cors');
const amqp = require('amqplib');

const app = express();
app.use(cors());

const generarNumeroAleatorio = () => {
    return Math.floor(Math.random() * 100) + 1;
};

app.get('/generar-numero-aleatorio', async (req, res) => {
    const numeroAleatorio = generarNumeroAleatorio();

    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        const queue = 'numeros_aleatorios';

        await channel.assertQueue(queue, { durable: true });
        await channel.sendToQueue(queue, Buffer.from(numeroAleatorio.toString()));

        console.log(`Número aleatorio ${numeroAleatorio} enviado a la cola`);
        
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error al enviar el número aleatorio a RabbitMQ:', error);
        res.status(500).json({ error: 'Error al generar el número aleatorio.' });
        return;
    }

    res.json({ numero: numeroAleatorio });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Generador de números aleatorios en funcionamiento en el puerto ${PORT}`);
});