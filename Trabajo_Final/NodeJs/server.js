const express = require('express');
const mongoose = require('mongoose');
const usuariosRoutes = require('./routes/usuarios_routes');

const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', usuariosRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/tienda', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('Conexión a MongoDB exitosa');
   })
   .catch(error => {
      console.error('Error de conexión a MongoDB:', error);
   });


const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Servidor escuchando en http://localhost:${PORT}/`);
});
