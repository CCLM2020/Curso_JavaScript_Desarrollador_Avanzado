const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
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

module.exports = router;