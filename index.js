const fs = require('fs');

fs.readFile('usuarios.txt', 'utf8', function(err, data){
    if(err) {
        console.log('no hay archivo');
    } else {
        console.log('sí hay archivo', data);
        fs.writeFile('usuarios.txt', data + '\nLuis', 'utf8', afterWrite);
    }
});

function afterWrite (err) {
    if(err){
        console.log('error al escribir archivo');
    } else {
        console.log('archivo escrito');
    }
}
