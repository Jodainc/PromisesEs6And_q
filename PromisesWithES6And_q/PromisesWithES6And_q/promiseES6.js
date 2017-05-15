'use strict';
var fs = require('fs'),
    Q = require('q'),
    file = 'assets/TextFile1.txt',
    newfile = 'assets/TextFile2.txt';
var promise = new Promise(function (resolve, reject) {
    fs.access(file, fs.F_OK, function (err) {
        return (err) ? reject(new Error('el archivo no existe')) : resolve(true);
    });
});

promise
    .then((resolve, reject) => {
        return new Promise(function (resolve,reject) {
            fs.readFile(file, function (err, data) {
                return (err) ? reject(new Error('el archivo no se pudo leer')) : resolve(data);
            })
        });
    })
    .then((resolve, reject) => {
        return new Promise(function (resolve, reject) {
            fs.writeFile(newfile, resolve, function (err) {
                return (err) ? reject(new Error('El archivo no se pudo copoar ')) : resolve('el archivo fue copiado')
            })
        });
    })
    .then((resolve, reject) => {
    console.log('se acabo la promesa'+ resolve));
    })
    .catch((err)=> {
        console.log('error capturado' + err.message);
    })