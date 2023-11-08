const express = require("express");
const formidable = require('express-formidable');
const usuarioController = require('../controllers/usuario_controllers');
const productoController = require('../controllers/producto_controllers');

const router = express.Router();

router.get('/usuarios', usuarioController.listado_Usuarios);

router.post('/validarUsuario', usuarioController.validar_Usuarios);

router.post('/agregarUsuario', formidable(), usuarioController.agregar_Usuarios);

router.post('/modificarUsuario', formidable(), usuarioController.modificar_Usuarios);

router.post('/eliminarUsuario', usuarioController.eliminar_Usuarios);


router.get('/productos', productoController.listado_Productos);

router.post('/agregarProducto', formidable(), productoController.agregar_Productos);

router.post('/modificarProducto', formidable(), productoController.modificar_Productos);

router.post('/eliminarProducto', productoController.eliminar_Productos);

module.exports = router;