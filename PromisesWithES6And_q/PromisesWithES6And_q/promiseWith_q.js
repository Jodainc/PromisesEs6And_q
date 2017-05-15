'use strict';
var fs = require('fs'),
    Q = require('q'),
    file = 'assets/TextFile1.txt',
    newfile = 'assets/TextFile2.txt';

function fileExist() {
    let defer = Q.defer();
    fs.access(file, fs.F_OK, function (err) {
        return (err) ? defer.reject(new Error('el archivo no existe')) : defer.resolve(true);
    });
    return defer.promise;
}

function readFile(file) {
    let defer = Q.defer();
    fs.readFile(file, function (err, data) {
        return (err) ? defer.reject(new Error('el archivo no se pudo leer')) : defer.resolve(data);
    })
    return defer.promise;
}
function writeFile(file, data) {
    let defer = Q.defer();
    fs.writeFile(newfile, data, function (err) {
        return (err) ? defer.reject(new Error('El archivo no se pudo copoar ')) : defer.resolve('el archivo fue copiado')
    });
    return defer.promise;
}

fileExist(file)
    .then(function () { return readFile(file); })
    .then(function (dataPromise) { return writeFile(newfile, dataPromise) })
    .then(function (dataPromise) { return console.log(dataPromise) })
    .fail(function (err) { return console.log('error critico' + err) })
