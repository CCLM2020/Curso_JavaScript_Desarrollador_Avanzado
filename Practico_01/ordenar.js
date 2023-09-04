let numeros = [45, 23, 11, 24];

for (var i = 0; i < numeros.length; i++) {


    for (var x = i+1; x < numeros.length; x++) {

        if ( numeros[i] > numeros[x]) {
            let valor_menor = numeros[i];
            numeros[i] = numeros[x];
            numeros[x] = valor_menor
        }

    }

}

console.log(numeros);