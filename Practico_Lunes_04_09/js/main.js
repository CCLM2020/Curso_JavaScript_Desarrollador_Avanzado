$(document).ready(function () {

    //le damos formato de numero a los input notas
    $('#nota_01, #nota_02, #nota_03').inputmask({
        suffix: '',
        alias: "numeric",
        placeholder: "",
        autoGroup: true,
        integerDigits: 2,
        digits: 0,
        digitsOptional: false,
        clearMaskOnLostFocus: false,
    });

    function estudiante(nombre, calificaciones) {
        this.nombre = nombre;
        this.calificaciones = calificaciones;
        // Calculamos el promedio de las notas
        this.promedio = parseFloat((this.calificaciones.reduce(function (promedio, nota) {
            return promedio + nota;
        }, 0) / this.calificaciones.length).toFixed(2));

    }

    let estudiantes = [];

    //cuando hago click en el boton agregar alumno
    $('#btn_agregar_alumno').click(function () {

        if (ComprobarDatos()) {

            let nombre_estudiante = $('#nombre_estudiante').val();

            Swal.fire({
                title: 'Agregar',
                html: '¿Desea agregar el estudiante: <b class="text-primary">' + nombre_estudiante + '</b>?',
                showCancelButton: true,
                confirmButtonText: 'Sí, agregar!',
                cancelButtonText: "Cancelar",
                reverseButtons: true,
                buttonsStyling: false,
                customClass: {
                    title: 'fs-4 text-primary',
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-primary me-2',
                }
            }).then((result) => {
                if (result.isConfirmed) {

                    let notas_estudiante = [parseFloat($('#nota_01').val()), parseFloat($('#nota_02').val()), parseFloat($('#nota_03').val())];
                    estudiantes.push(new estudiante(nombre_estudiante, notas_estudiante));

                    $("#frm_alumnos")[0].reset();
                    i = (estudiantes.length - 1);

                    $("#tbl_estudiantes tbody").append('<tr><td>' + estudiantes[i].nombre + '</td><td>' + estudiantes[i].calificaciones[0] + '</td><td>' + estudiantes[i].calificaciones[1] + '</td><td>' + estudiantes[i].calificaciones[2] + '</td><td>' + estudiantes[i].promedio + '</td><td><a class="text-success editar-alumno" name="editar-alumno" id="' + i + '" title="Editar"><i class="fa-regular fa-pen-to-square my-auto pe-1 fa-lg"></i></a><a class="text-danger ps-3 eliminar-alumno" name="eliminar-alumno" id="' + i + '" title="Eliminar"><i class="fa-regular fa-trash-can my-auto pe-1 fa-lg"></i></a></td></tr>');

                    if (estudiantes.length >= 3) {
                        $('#btn_agregar_alumno').addClass('ocultar');
                        $('#btn_reset').removeClass('ocultar');
                    }

                };
            })
        };
    });


    //cuando hago click en el boton resetear
    $('#btn_reset').click(function () {
        Swal.fire({
            title: 'Resetear',
            html: '¿Desea resetear la lista de estudiantes con sus promedios?',
            showCancelButton: true,
            confirmButtonText: 'Sí, resetear!',
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            buttonsStyling: false,
            customClass: {
                title: 'fs-4 text-danger',
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-outline-danger me-2',
            }
        }).then((result) => {
            if (result.isConfirmed) {

                estudiantes.length = 0;
                $('#tbl_estudiantes tbody').empty();

                $('#btn_agregar_alumno').removeClass('ocultar');
                $('#btn_reset').addClass('ocultar');
            };
        })
    });

    //Cuando hacemos click en algun borrar de alguna fila de la tabla categorias
    $('#tbl_estudiantes tbody').on('click', '.eliminar-alumno', function () {
        let id_alumno = $(this).attr("id");
        alert('eliminar '+id_alumno)
    });
    var id_categoria = $(this).attr("id");
    /*
    $('.eliminar-alumno').on('click', function(e) {
        alert('eliminar')
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        
        // Encuentra la fila padre (tr) y la elimina
        $(this).closest('tr').remove();
      });
      */

    //Esta función comprueba los datos requeridos
    function ComprobarDatos() {
        if ($('#nombre_estudiante').val() === "") { //si el nombre esta vacio
            $('#nombre_estudiante').addClass('error');
            $('#error_nombre').removeClass('ocultar');
            $("#nombre_estudiante").focus();
            return false;
        } else if ($('#nota_01').val() === "" || !validateNumero($('#nota_01').val())) { //si nota esta vacio o no es numero valido
            $('#nota_01').addClass('error');
            if ($('#nota_01').val() !== "" && !validateNumero($('#nota_01').val())) { //si nota trae algo pero no es un numero valido
                $('#error_nota_01').text('La nota debe ir de 0 a 10 ');
            } else {
                $('#error_nota_01').text('Falta agregar la nota ');
            }
            $("#error_nota_01").append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
            $('#error_nota_01').removeClass('ocultar');
            $("#nota_01").focus();
            return false;
        } else if ($('#nota_02').val() === "" || !validateNumero($('#nota_02').val())) {
            $('#nota_02').addClass('error');
            if ($('#nota_02').val() !== "" && !validateNumero($('#nota_02').val())) { //si nota trae algo pero no es un numero valido
                $('#error_nota_02').text('La nota debe ir de 0 a 10 ');
            } else {
                $('#error_nota_02').text('Falta agregar la nota ');
            }
            $("#error_nota_02").append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
            $('#error_nota_02').removeClass('ocultar');
            $("#nota_02").focus();
            return false;
        } else if ($('#nota_03').val() === "" || !validateNumero($('#nota_03').val())) {
            $('#nota_03').addClass('error');
            if ($('#nota_03').val() !== "" && !validateNumero($('#nota_03').val())) { //si nota trae algo pero no es un numero valido
                $('#error_nota_03').text('La nota debe ir de 0 a 10 ');
            } else {
                $('#error_nota_03').text('Falta agregar la nota ');
            }
            $("#error_nota_03").append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
            $('#error_nota_03').removeClass('ocultar');
            $("#nota_03").focus();
            return false;
        } else {
            return true;
        }
    };


    //Cuando escribo un valor se borra el mensaje de error y recupera el color normal
    $('#nombre_estudiante').keyup(function () {
        if ($('#nombre_estudiante').val() !== "") {
            $('#nombre_estudiante').removeClass('error');
            $('#error_nombre').addClass('ocultar');
        }
    });

    //Cuando escribo un valor se borra el mensaje de error y recupera el color normal
    $('#nota_01').keyup(function () {
        if ($('#nota_01').val() !== "") {
            $('#nota_01').removeClass('error');
            $('#error_nota_01').addClass('ocultar');
        }
    });

    //Cuando escribo un valor se borra el mensaje de error y recupera el color normal
    $('#nota_02').keyup(function () {
        if ($('#nota_02').val() !== "") {
            $('#nota_02').removeClass('error');
            $('#error_nota_02').addClass('ocultar');
        }
    });

    //Cuando escribo un valor se borra el mensaje de error y recupera el color normal
    $('#nota_03').keyup(function () {
        if ($('#nota_03').val() !== "") {
            $('#nota_03').removeClass('error');
            $('#error_nota_03').addClass('ocultar');
        }
    });

    function validateNumero(input) {

        // Validamos que el valor sea un número
        if (!$.isNumeric(input)) {
            return false;
        }

        // Validamos que el valor esté entre 1 y 10
        var value = parseInt(input);
        if (value < 0 || value > 10) {
            return false;
        }

        return true;
    }
});