const mongoose = require('mongoose');

const usuarios = new mongoose.Schema({
    nombreUsuario: String,
    claveUsuario: String,
    imagenUsuario: String
 });

 module.exports = mongoose.model('usuarios', usuarios);