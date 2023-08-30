const clase = {
    estudiantes: [
        {
            nombre: "Juan Pérez",
            calificaciones: [8, 9, 10],
        },
        {
            nombre: "María López",
            calificaciones: [9, 8, 9],
        },
        {
            nombre: "Pedro González",
            calificaciones: [3, 7, 8],
        },
    ],
};

for (var i = 0; i < clase.estudiantes.length; i++) {
    let suma = 0;
    let cantidad =  0;
    let promedio = 0;

    for (var x = 0; x < clase.estudiantes[i].calificaciones.length; x++) {
        suma = suma + clase.estudiantes[i].calificaciones[x];
    }
    cantidad = clase.estudiantes[i].calificaciones.length; 

    promedio = suma/cantidad;

    console.log("Estudiante: " + clase.estudiantes[i].nombre);
    console.log("Promedio: " + promedio + "\n\n");

}

