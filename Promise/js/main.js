// Creamos una función que devuelve una promesa
function primeraAccion() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve("Primera acción completada");
        }, 1000);
    });
}

// Encadenamos dos acciones usando .then
primeraAccion()
    .then(function (resultado) {
        console.log(resultado); // Imprime "Primera acción completada"
        return "Segunda acción completada";
    })
    .then(function (resultado) {
        console.log(resultado); // Imprime "Segunda acción completada"
        return "Tercera acción completada";
    })
    .then(function (resultado) {
        console.log(resultado); // Imprime "Tercera acción completada"
    });
