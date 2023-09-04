let numeros = [45, 23, 11, 24];

for (var i = 0; i < numeros.length; i++) {

    let valor_menor = numeros[i];
    posicion_menor = 0;

    for (var x = i+1; x < numeros.length; x++) {

        if ( valor_menor > numeros[x]) {
            
            valor_menor = numeros[x];
            posicion_menor = x;

        }

    }
    if (posicion_menor > 0) {
        numeros[posicion_menor] = numeros[i];
        numeros[i] = valor_menor;
    }

}

console.log(numeros);