$(document).ready(function () {
    //ejercicio 1
    // Seleccionar el primer párrafo hijo dentro de .contenedor y cambiar su color de texto a rojo
    $('.contenedor p:first').css('color', 'red');

    // Seleccionar el último párrafo hijo dentro de .contenedor y cambiar su color de texto a rojo
    $('.contenedor p:last').css('color', 'red');

    // Seleccionar todos los elementos <span> dentro de un <div> dentro de un <p>
    // que se encuentran dentro del elemento con id "parent"
    $('div.parent > div.clase_p > div > span').addClass('bg-warning');

    // Seleccionar el tercer elemento <li>
    $('ul.clase_ul li:eq(2)').text('Nuevo Elemento');

    // Seleccionar todas las cajas .box que contienen una lista <ul>
    $('div.contenedor_ejer_4 > .box:has(ul)').addClass('has-list');

    $('#container .box ul').addClass('highlight');

    // Agregar un evento click a cada botón
    $('#btn1').click(function() {
        alert('¡Hiciste clic en el Botón 1!');
      });

      $('#btn2').click(function() {
        alert('¡Hiciste clic en el Botón 2!');
      });

      $('#btn3').click(function() {
        alert('¡Hiciste clic en el Botón 3!');
      });
});
