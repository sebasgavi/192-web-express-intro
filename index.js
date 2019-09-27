// importar módulo
const express = require('express');
// importar body parser
var bodyParser = require('body-parser');
// importar file system
var fs = require('fs');

// instanciar app
const app = express();

// configuración body parser para poder usar variables post en el body
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/producto/:name', (request, response) => {
    response.send('página de producto ' + request.params.name);
});

app.post('/receiveContact', (request, response) => {
    console.log('contacto recibido', request.body);

    var data = `
    Nombre: ${request.body.name}
    Mensaje: ${request.body.message}

    ----------------------------------
    `;

    fs.appendFile('messages.txt', data, 'utf8', (err) => {
        console.log(err ? 'hubo un error' : 'se creó el archivo');
    });

    response.redirect('/contacto?sent=true');
});

// inicar servidor en el puerto definido anteriormente
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

// get - pedir información al servidor
// post - enviar nueva información al servidor
// delete - borrar información del servidor
// put/patch - actualizar información en el servidor