$(document).ready(function () {

    //Crea un botón en tu página HTML y utiliza jQuery para mostrar
    //un mensaje de alerta cuando se haga clic en el botón.
    $('#btn_clic').click(function () {
        alert('clic');
    });


    //Agrega un evento para cambiar el color de fondo de un elemento cuando
    //el cursor del mouse se mueva sobre él (utiliza mouseenter y mouseleave).
    $('#div_fondo_color').mouseenter(function () {
        $('#div_fondo_color').addClass('bg-danger');
    });
    
    $('#div_fondo_color').mouseleave(function () {
        $('#div_fondo_color').removeClass('bg-danger');
    });


    //Crea una lista de elementos y utiliza eventos para resaltar
    //un elemento cuando se hace clic en él y quitar el resaltado
    //cuando se hace clic en otro elemento.
    $("#lista li").click(function () {
        $(this).addClass("bg-warning").siblings().removeClass("bg-warning");
    });


    //Crea una lista de elementos en HTML y usa jQuery para ocultar
    //todos los elementos hermanos cuando se hace clic en uno de ellos,
    //y luego mostrarlos nuevamente cuando se hace clic en el elemento original.
    $('#lista_ocultar li').on('click', function () {
        $(this).siblings().toggle(); // Alterna la visibilidad de los elementos hermanos
    });


    //Crea una lista de elementos en HTML con diferentes clases aplicadas a los
    //elementos de lista y utiliza jQuery para seleccionar y resaltar solo los
    //elementos hermanos que tienen la misma clase que el elemento clicado.
    //Por ejemplo, si haces clic en un elemento con la clase "importante",
    //solo los elementos hermanos con la misma clase se resaltarán
    $('#lista_hermanos li').on('click', function () {
        var claseClicada = $(this).attr('class'); // Obtiene la clase del elemento clicado
        $('#lista_hermanos li').removeClass('bg-danger'); // Elimina la clase "resaltado" de todos los elementos
        $(this).addClass('bg-danger');
        $(this).siblings('.' + claseClicada).addClass('bg-danger'); // Resalta los hermanos con la misma clase
    });

    //$("body").on("click","ul li", function(e){    $(e.target).show().siblings().toggle();})
    /*
    $("body").on("click", "ul li", function (e) {
        let claseSeleccionada = $(this).attr("class");
        $(this).siblings().removeClass("resaltado");
        $(this).addClass("resaltado");
        $(this).siblings("." + claseSeleccionada).addClass("resaltado");
    })*/


});

