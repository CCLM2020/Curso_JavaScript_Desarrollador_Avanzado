$(document).ready(function () {

    //le damos formato de numero a los input notas
    $('#nota_01, #nota_02, #nota_03').inputmask({
        suffix: '',
        alias: "numeric",
        placeholder: "0",
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

        let nombre_estudiante = $('#nombre_estudiante').val();
        let notas_estudiante = [parseFloat($('#nota_01').val()), parseFloat($('#nota_02').val()), parseFloat($('#nota_03').val())];
        
        estudiantes.push(new estudiante(nombre_estudiante, notas_estudiante));
        if (validateNumero($('#nota_01').val())) {
            alert('funciona')
        } else {
            alert('noooo')
        }
        console.log(estudiantes);
    });


    //Esta función comprueba los datos requeridos
    function ComprobarDatos() {
        if ($('#nombre_estudiante').val() === "") {
            $('#nombre_estudiante').css("background", "#FDB0AF");
            $('#nombre_estudiante').attr("placeholder", "Falta el nombre del alumno");
            $("#nombre_estudiante").focus();
            return false;
        } else if ($('#id_txt_apellido').val() === "") {
            $('#id_txt_apellido').css("background", "#FDB0AF");
            $('#id_txt_apellido').attr("placeholder", "Falta el apellido del usuario");
            $("#id_txt_apellido").focus();
            return false;
        } else if (!checkEdad('id_txt_edad', 'span_error_edad')) {
            $('#span_error_edad').removeClass('correo-hide');
            $('#id_txt_edad').css("background", "#FDB0AF");
            $("#id_txt_edad").focus();
            return false;
        } else if ($('#id_txt_correo').val() == "") {
            $('#id_txt_correo').css("background", "#FDB0AF");
            $('#id_txt_correo').attr("placeholder", "Falta ingresar el email");
            $("#id_txt_correo").focus();
            return false;
        } else if (!validarFormatoEmail('id_txt_correo')) {
            $('#span_error_Email').text('Utilice un formato de correo válido (ejemplo: miCorreo@correo.com).');
            $('#span_error_Email').removeClass('correo-hide');
            $('#id_txt_correo').css("background", "#FDB0AF");
            $("#id_txt_correo").focus();
            return false;
        } else if ($('#id_txt_usuario').val() == "") {
            $('#id_txt_usuario').css("background", "#FDB0AF");
            $('#id_txt_usuario').attr("placeholder", "Falta el apellido del usuario");
            $("#id_txt_usuario").focus();
            return false;
        } else if ($('#id_txt_password_1').val() == "") {
            $('#span_error_Pass_A').text('Falta ingresar la contraseña');
            $('#span_error_Pass_A').removeClass('correo-hide');
            $('#id_txt_password_1').css("background", "#FDB0AF");
            $("#id_txt_password_1").focus();
            return false;
        } else if ($('#id_txt_password_2').val() == "") {
            $('#span_error_Pass_B').text('Falta ingresar la contraseña');
            $('#span_error_Pass_B').removeClass('correo-hide');
            $('#id_txt_password_2').css("background", "#FDB0AF");
            $("#id_txt_password_2").focus();
            return false;
        } else if (!comprobarIgualdad('id_txt_password_1', 'id_txt_password_2')) {
            $('#span_error_Pass_A').text('Las contraseñas son distintas');
            $('#span_error_Pass_A').removeClass('correo-hide');
            $('#id_txt_password_1').css("background", "#FDB0AF");
            $('#id_txt_password_2').css("background", "#FDB0AF");
            $("#id_txt_password_1").focus();
            return false;
        } else if (!checkPassword('id_txt_password_1', 'span_error_Pass_A')) {
            $('#span_error_Pass_A').removeClass('correo-hide');
            $('#id_txt_password_1').css("background", "#FDB0AF");
            $('#id_txt_password_2').css("background", "#FDB0AF");
            $("#id_txt_password_1").focus();
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