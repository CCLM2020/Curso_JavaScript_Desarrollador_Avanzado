// 1.Suma de elementos en un arreglo:
// Escribe una función que use reduce() para sumar todos los elementos de un arreglo de
// números.

function sumar(arreglo) {

    let suma = arreglo.reduce((numeros, total) => numeros + total, 0);

    return suma;

}

let numeros = [3, 2, 3, 4, 7];
let resultado = sumar(numeros);
console.log('El resultado de la suma es: ' + resultado + '\n\n');


// 2.Multiplicación de elementos en un arreglo:
// Crea una función que utilice reduce() para multiplicar todos los elementos de un arreglo de
// números.

function multiplicar(arreglo) {

    let producto = arreglo.reduce((numeros, total) => numeros * total, 1);

    return producto;

}

let numeros_2 = [2, 3, 4, 2];
let resultado_2 = multiplicar(numeros_2);

console.log('El resultado de la multiplicación es: ' + resultado_2 + '\n\n');


// 3.Concatenación de cadenas:
// Implementa una función que use reduce() para concatenar todos los elementos de un
// arreglo de cadenas en una sola cadena.

function concatenar(arreglo) {

    let cadena = arreglo.reduce((cadenas, cadena) => cadenas + cadena, '');

    return cadena;

}

let cadenas = ["Este", " es", " el", " ejercicio", " 3"];
let resultado_3 = concatenar(cadenas);

console.log('La cadena formada es: ' + resultado_3 + '\n\n');


// 4.Calcular el promedio:
// Escribe una función que use reduce() para calcular el promedio de un arreglo de números.

function promedio(arreglo) {

    let suma = arreglo.reduce((numeros, numero) => numeros + numero, 0);

    let promedio = suma / arreglo.length;

    return promedio;
}

let numeros_4 = [8, 9, 9, 7, 10];
let resultado_4 = promedio(numeros_4);

console.log('El promedio es: ' + resultado_4 + '\n\n');


// 5.Encontrar el valor máximo:
// Crea una función que utilice reduce() para encontrar el valor máximo en un arreglo de
// números.

function valor_maximo(arreglo) {

    let maximo = arreglo.reduce((maximo, numero) => (numero > maximo ? numero : maximo), 0);

    return maximo;
}

let numeros_5 = [12, 5, 67, 8, 101, 42];
let resultado_5 = valor_maximo(numeros_5);
console.log('El valor máximo es: ' + resultado_5 + '\n\n');


// 6.Contar ocurrencias:
// Escribe una función que cuente cuántas veces aparece un elemento específico en un
// arreglo utilizando reduce().

function contar_repetido(arreglo, buscado) {

    let contador = arreglo.reduce((contar_encontrados, numeros) => {

        if (numeros === buscado) {

            return contar_encontrados + 1;

        } else {

            return contar_encontrados;

        }

    }, 0);

    return contador;
}


let numeros_6 = [1, 2, 2, 3, 2, 4, 5, 2];
let buscado = 2;
let resultado_6 = contar_repetido(numeros_6, buscado);
console.log('El valor ' + buscado + ' se repite: ' + resultado_6 + ' veces.' + '\n\n');


// 7. Ordenar palabras por longitud:
// Crea una función que ordene un arreglo de palabras por su longitud, es decir, la cantidad de
// caracteres.

function ordenar_longitud(arreglo) {

    arreglo.sort(function (a, b) {

        return a.length - b.length;

    });

    return arreglo;

}


let palabras = ["casa", "oso", "pelota"];
let resultado_7 = ordenar_longitud(palabras);
console.log('Las palabras ordenas quedan: ' + resultado_7 + '\n\n');


// 8. Búsqueda de un elemento en un arreglo:
// Escribe una función que busque un elemento específico en un arreglo y devuelva true si se
// encuentra o false si no se encuentra.

function buscar(arreglo, buscado) {

    return arreglo.includes(buscado);

}


let numeros_8 = [1, 2, 3, 4, 5];
let buscado_8 = 3;
let encontrado = buscar(numeros_8, buscado_8);
console.log('El resultado de la busqueda es: ' + encontrado + '\n\n');


// 9. Búsqueda de la primera coincidencia:
// Implementa una función que busque la primera instancia de un elemento en un arreglo y
// devuelva su índice. Si el elemento no está en el arreglo, devuelve -1.

function buscar_indice(arreglo, buscado) {

    for (let i = 0; i < arreglo.length; i++) {

        if (arreglo[i] === buscado) {

            return i;

        }

    }

    return -1;

}


let numeros_9 = [1, 2, 3, 4, 5];
let buscado_9 = 3;
let indice = buscar_indice(numeros_9, buscado_9);
console.log('El valor ' + buscado_9 + ' esta en la posición: ' + indice + ' del array.' + '\n\n');


// 10. Búsqueda de la última coincidencia:
// Crea una función que busque la última instancia de un elemento en un arreglo y devuelva
// su índice. Si el elemento no está en el arreglo, devuelve -1.


function buscar_ultimo(arreglo, buscado) {

    let posicion = -1;

    for (let i = 0; i < arreglo.length; i++) {

        if (arreglo[i] === buscado) {

            posicion =  i;

        }

    }

    return posicion;

}


let numeros_10= [1, 2, 2, 3, 2, 4, 5, 2];
let buscado_10 = 2;
let indice_10 = buscar_ultimo(numeros_10, buscado_10);
console.log('El valor ' + buscado_10 + ' esta en la posición: ' + indice_10 + ' por última vez en el array.' + '\n\n');