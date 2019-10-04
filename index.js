// importar handlebars :)
var exphbs  = require('express-handlebars');
 

// importar módulo
const express = require('express');
// importar body parser
var bodyParser = require('body-parser');
// importar file system
var fs = require('fs');

// instanciar app
const app = express();
//lineas de handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// configuración body parser para poder usar variables post en el body
app.use(bodyParser.urlencoded({ extended: true }));

// definir puerto
const port = 3000;

// definir una carpeta como pública
app.use(express.static('public'));

var cartList = [];

var studentList = [
    {
        name: 'Maria Jose',
        age: 20,
        semester: 6,
    },
    {
        name: 'Jose',
        age: 22,
        semester: 5,
    },
    {
        name: 'Karen',
        age: 19,
        semester: 7,
    },
    {
        name: 'Juan',
        age: 24,
        semester: 5,
    },
    {
        name: 'Otro',
        age: 40,
        semester: 12,
    }
];



// definir ruta tipo get y su acción
app.get('/', (request, response) => {
    console.log('alguien entró a la ruta inicial');
    response.sendFile(__dirname + '/public/home.html');
});

app.get('/api/students', (request, response) => {
    response.send(studentList);
});

app.get('/api/cart', (request, response) => {
    response.send(cartList);
});

app.post('/api/cart/:name', (request, response) => {
    var name = request.params.name;
    var student = studentList.find(function(elem) {
        if(name == elem.name) {
            return true;
        }
    });

    if(!student){
        response.send({
            message: 'error',
            cartLength: cartList.length
        });
        return;
    }

    cartList.push(student);
    response.send({
        cartLength: cartList.length
    });
});

app.get('/estudiantes', (request, response) => {

    var listCopy = studentList.slice();

    if(request.query.orderType == 'orderAge'){
        listCopy.sort(function(a, b){
            return a.age - b.age;
        });
    }

    if(request.query.orderType == 'orderSemester'){
        listCopy.sort(function(a, b){
            return a.semester - b.semester;
        });
    }

    if(request.query.filter == 'old'){
        listCopy = listCopy.filter(function(elem){
            if(elem.age > 20){
                return true;
            } else {
                return false;
            }
        });
    }

    var context = {
        list: listCopy,
        cart: cartList,
        test: 'hola'
    };
    response.render('students', context);
});

app.get('/contacto', (request, response) => {
    console.log('alguien entró a la ruta de contacto');
    response.render('contact');
});

app.get('/producto/:name', (request, response) => {
    var context = {
        name: request.params.name,
        price: 100000,
    };
    response.render('product', context);
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