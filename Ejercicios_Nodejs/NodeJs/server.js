// Importa el módulo http de Node.js
/*
const http = require('http');

// Crea un servidor HTTP
const server = http.createServer((req, res) => {
  // Configura la respuesta HTTP con el código de estado 200 y el tipo de contenido
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Escribe el mensaje de respuesta
  res.end('¡Hola desde el servidor HTTP de Node.js!\n');
});

// Escucha en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}/`);
});
*/
//const bodyParser = require('body-parser');
//app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dias = require('./functionDias');
const libros = require('./routes/libros');
const tienda = require('./routes/tienda');


const app = express();
app.use(cors());
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

mongoose.connect('mongodb://127.0.0.1:27017/curso', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('Conexión a MongoDB exitosa');
   })
   .catch(error => {
      console.error('Error de conexión a MongoDB:', error);
   });

//const dia = dias.diaenLetras(1);
console.log(dias.sumar(1,2));

console.log(dias.diaenLetras(2));

//app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, Express CCLM!');
});

app.get("/products", (req,res) => {
  const products = [
  {
    id: 1,
    name: "hammer",
  },
  {
    id: 2,
    name: "screwdriver",
  },
  {
    id: 3,
    name: "wrench",
  },
 ];

 res.json(products);
});

app.get("/usuarios", (req,res) => {
  const usuarios = [
  {
    id: 1,
    codigo: 100001,
    nombre: "María García",
  },
  {
    id: 2,
    codigo: 100002,
    nombre: "Juan Rodríguez",
  },
  {
    id: 3,
    codigo: 100003,
    nombre: "Ana López",
  },
  {
    id: 4,
    codigo: 100004,
    nombre: "Luis Martínez",
  },
  {
    id: 5,
    codigo: 100005,
    nombre: "Laura González",
  },
  {
    id: 6,
    codigo: 100006,
    nombre: "Carlos Hernández",
  },
  {
    id: 7,
    codigo: 100007,
    nombre: "Sofia Morales",
  },
  {
    id: 8,
    codigo: 100008,
    nombre: "Diego Pérez",
  },
  {
    id: 9,
    codigo: 100009,
    nombre: "Isabella Torres",
  },
  {
    id: 10,
    codigo: 100010,
    nombre: "Rafael Ramírez",
  },
 ];

 res.json(usuarios);
});


app.use('/libros', libros);
/*
app.get("/libros", (req,res) => {
  const libros = [
    { id: 1, título: 'El Alquimista', autor: 'Paulo Coelho', año: 1988 },
    { id: 2, título: 'Cien años de soledad', autor: 'Gabriel García Márquez', año: 1967 },
    { id: 3, título: '1984', autor: 'George Orwell', año: 1949 },
    { id: 4, título: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', año: 1605 },
    { id: 5, título: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', año: 1997 },
    { id: 6, título: 'Matar un ruiseñor', autor: 'Harper Lee', año: 1960 },
    { id: 7, título: 'Orgullo y prejuicio', autor: 'Jane Austen', año: 1813 },
    { id: 8, título: 'Rayuela', autor: 'Julio Cortázar', año: 1963 },
    { id: 9, título: 'Los juegos del hambre', autor: 'Suzanne Collins', año: 2008 },
    { id: 10, título: 'La sombra del viento', autor: 'Carlos Ruiz Zafón', año: 2001 },
  ];
 res.json(libros);
});
*/

app.use('/tienda', tienda);

app.post("/validarUsuario", (req,res) => {
  const data = req.body;
  console.log('Datos recibidos:', data);
  const htmlResponse = `<p>El usuario <strong>${data.id_txtUsuario}</strong> se ha logueado correctamente.</p>`;
  res.send(htmlResponse);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}/`);
});
