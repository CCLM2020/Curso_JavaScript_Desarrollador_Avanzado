const usuario = {
  nombre: "Juan",
  peliculasFavoritas: [
    {
      titulo: "Pulp Fiction",
      año: 1994,
    },
    {
      titulo: "El padrino",
      año: 1972,
    },
    {
      titulo: "El señor de los anillos: El retorno del rey",
      año: 2003,
    },
  ],
};

console.log(usuario.peliculasFavoritas[1].titulo);