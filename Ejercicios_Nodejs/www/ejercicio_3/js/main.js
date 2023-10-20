$(document).ready(function () {

    //cuando click en el icono ver password dejor ver el texto o lo oculto
    $('#id-icono-password').click(function () {

        var passwordInput = $('#id_txtContrasenia');
        var passwordType = passwordInput.attr('type');

        if (passwordType === 'password') {
            passwordInput.attr('type', 'text');
            $('#id-icono').removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            passwordInput.attr('type', 'password');
            $('#id-icono').removeClass('fa-eye').addClass('fa-eye-slash');
        }
        $('#id_txtContrasenia').focus();
    });

    //si hago click en cancelar me lleva a la pagina de inicio
    $('#btn-cancelar').click(function () {
        event.preventDefault(); //evito se envie el formulario
        console.log('saliendo...');
    });

    $('#frm_Usuario').submit(function(event){
        event.preventDefault(); //evito se envie el formulario

        const formData = $(this).serialize();

        $.post('http://localhost:3000/validarUsuario', formData, function(response){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response,
                confirmButtonText: 'Aceptar',
                buttonsStyling: false,
                customClass: {
                    title: 'fs-5',
                    icon: 'h6 mt-3',
                    confirmButton: 'btn btn-success'
                }
            })
        })
    });
    

    //me fijo que ambos input tengan algo para activar el boton entrar
    $('#id_txtUsuario, #id_txtContrasenia').on('input', function () {
        var user = $('#id_txtUsuario').val();
        var pass = $('#id_txtContrasenia').val();

        if (user && pass) {
            $('#btn-entrar').prop('disabled', false);
        } else {
            $('#btn-entrar').prop('disabled', true);
        }
    });

    //cuando doy enter en el cuadro buscar
    $('#id_txtContrasenia').keypress(function (enter) {
        if ((enter.which == 13)) {
            $('#btn-entrar').click();
        };
    });

}); //fin document ready

//Funcion que elimina todos los caracteres que no sean permitidos en el nombre
function limpiarAdmin(valorBusqueda = "") {
    let valorActual = valorBusqueda;
    let valorLimpio = valorActual.replace(/[^A-Za-z0-9_-]/g, '');
    return valorLimpio;
};