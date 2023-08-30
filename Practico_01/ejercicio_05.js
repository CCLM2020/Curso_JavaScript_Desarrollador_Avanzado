const perfil = {
    nombre: "Juan Pérez",
    edad: 30,
    amigos: [
        {
            nombre: "María López",
            edad: 25,
        },
        {
            nombre: "Pedro González",
            edad: 35,
        },
        {
            nombre: "Luisa Hernández",
            edad: 20,
        },
    ],
};

let edad = perfil.amigos[0].edad;
let nombre = perfil.amigos[0].nombre;

for (var i = 1; i < perfil.amigos.length; i++) {

    if ( perfil.amigos[i].edad < edad) {
        edad = perfil.amigos[i].edad;
        nombre = perfil.amigos[i].nombre;
    }

}

console.log("El amigo mas joven es:");
console.log("Nombre: " + nombre);
console.log("edad: " + edad);