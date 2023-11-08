const mongoose = require('mongoose');

const productos = new mongoose.Schema({
    nombreProducto: String,
    imagenProducto: String,
    precioProducto: Number,
    cantidadProducto: Number,
    potenciaProducto: Number
 });

 module.exports = mongoose.model('productos', productos);