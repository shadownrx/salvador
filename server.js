const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
// Manejar la conexión de un cliente
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Manejar el evento de votación recibido desde el cliente
  socket.on('votacion', (data) => {
    // Procesar la votación y enviarla a todos los clientes conectados
    io.emit('nuevaVotacion', data);
  });

  // Manejar la desconexión de un cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});