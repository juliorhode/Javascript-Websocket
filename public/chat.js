const socket = io();

// Elementos del DOM
let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let enviar = document.getElementById('enviar');
let salida = document.getElementById('salida');
let acciones = document.getElementById('acciones');

enviar.addEventListener('click',function(){
    // alert('click')
    socket.emit('chat:mensaje',{
        usuario: usuario.value,
        mensaje: mensaje.value
    });
    console.log({
        usuario: usuario.value,
        mensaje: mensaje.value
    });
    
});

mensaje.addEventListener('keypress', function(){
    socket.emit('chat:escribiendo', usuario.value);
})

socket.on('chat:mensaje', function(data){
    console.log(data);
    acciones.innerHTML = '';
    
    salida.innerHTML += `<p>
        <strong>${data.usuario}:</strong> ${data.mensaje}
    </p>`;
    
});
socket.on('chat:escribiendo', function(data){
    acciones.innerHTML = `<p>
        <strong><em>${data} esta escibiendo un mensaje</em></strong> 
    </p>`
});