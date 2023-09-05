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
        clearMaskOnLostFocus: false
        //radixPoint: ','
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
        
        }
        /*
        let nombre_estudiante = $('#nombre_estudiante').val();
        let notas_estudiante = [parseFloat($('#nota_01').val()), parseFloat($('#nota_02').val()), parseFloat($('#nota_03').val())];
        
        estudiantes.push(new estudiante(nombre_estudiante, notas_estudiante));

        alert($('#nota_01').val())
        if (validateNumero($('#nota_01').val())) {
            alert('funciona')
        } else {
            alert('noooo')
        }
        console.log(estudiantes);*/

    });


    //Esta función comprueba los datos requeridos
    function ComprobarDatos() {
        if ($('#nombre_estudiante').val() === "") {
            //$('#nombre_estudiante').css("background", "#FDB0AF");
            $('#nombre_estudiante').addClass('error');
            $('#nombre_estudiante').attr("placeholder", "Falta el nombre del alumno");
            $("#nombre_estudiante").focus();
            return false;
        } else if ($('#nota_01').val() === "" || !validateNumero($('#nota_01').val())) {
            $('#nota_01').css("background", "#FDB0AF");
            $('#nota_01').attr("placeholder", "");
            $("#nota_01").focus();
            return false;
        } else if ($('#nota_02').val() === "" || !validateNumero($('#nota_02').val())) {
            $('#nota_02').removeClass('correo-hide');
            $('#nota_02').css("background", "#FDB0AF");
            $("#nota_02").focus();
            return false;
        } else if ($('#nota_03').val() === "" || !validateNumero($('#nota_03').val())) {
            $('#nota_03').css("background", "#FDB0AF");
            $('#nota_03').attr("placeholder", "");
            $("#nota_03").focus();
            return false;
        } else {
            return true;
        }
    };



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