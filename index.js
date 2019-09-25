// importar módulo
const express = require('express');

// instanciar app
const app = express();

// definir puerto
const port = 3000;

// definir una carpeta como pública
app.use(express.static('public'));

// definir ruta tipo get y su acción
app.get('/', (request, response) => {
    console.log('alguien entró a la ruta inicial');
    response.sendFile(__dirname + '/public/home.html');
});

app.get('/contacto', (request, response) => {
    console.log('alguien entró a la ruta de contacto');
    response.sendFile(__dirname + '/public/contact.html');
});

app.get('/receiveContact', (request, response) => {
    console.log('contacto recibido', request.query);
    response.send('hola');
});

// inicar servidor en el puerto definido anteriormente
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});