const express = require('express');
const app = express();
const path = require('path');
const SocketIO = require('socket.io');

// Settings
app.set('port',process.env.PORT || 3000);

// Archivos estaticos
app.use(express.static(path.join(__dirname , 'public')));

// Inicio del servidor
const server = app.listen(app.get('port'),()=>{
    console.log('Servidor iniciado en puerto', app.get('port'));
});


// WebSockets
/*
Como es el proceso
------------------
Al iniciar el servidor, todo el contenido es enviado al navegador. Cuando el navegador se inicia y podemos ver el contenido, tambien se esta cargando el javascript de socketio y de esta manera, el cliente se conecta al servidor. El primer evento que se disparara es el evento connection
*/
// Le pasamos el servidor ya creado
const io = SocketIO(server);

// Cuando alguien se conecte
// socket es una constante que viene desde chat.js
io.on('connection', (socket)=> {
    // console.log('Nueva conexion',socket);
    console.log('Nueva conexion',socket.id);

    // el data son los datos que vienen de chat.js:
    // socket.emit('chat:mensaje',{
    //     usuario: usuario.value,
    //     mensaje: mensaje.value
    // });
    socket.on('chat:mensaje',(data)=>{
        console.log(data);
        // para emitir a todos, incluyendome
        io.sockets.emit('chat:mensaje', data);
        
    });

    socket.on('chat:escribiendo', (data)=>{
        // para emitir a todos menos a mi
        socket.broadcast.emit('chat:escribiendo',data)
    });
});