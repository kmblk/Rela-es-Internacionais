const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));  // Servir arquivos estáticos

io.on('connection', (socket) => {
    console.log('Usuário conectado');
    
    socket.on('sendMessage', (msg) => {
        io.emit('receiveMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
