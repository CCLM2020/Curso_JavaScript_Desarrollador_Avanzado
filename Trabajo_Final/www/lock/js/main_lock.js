$(document).ready(function () {
    const URL_SERVER = "http://localhost:3000/api/";

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
        $(location).attr('href', '../index.html');
    });


    $('#btn-entrar').click(function () {

        var user = limpiarAdmin($('#id_txtUsuario').val().trim());
        var pass = $('#id_txtContrasenia').val().trim();

        if (user && pass) {
            // Envía una solicitud AJAX al archivo candado.php
            $.ajax({
                type: 'POST',
                url: URL_SERVER + "validarUsuario",
                data: {
                    id_txtUsuario: user,
                    id_txtContrasenia: pass
                },
                success: function (response) {
                
                    if (response.estado > 0) {                       
                        localStorage.setItem("usuario", user);
                        localStorage.setItem("imagen", response.imagen);
                        localStorage.setItem("id_usuario", response.id_usuario);
                        $(location).attr('href', response.ruta);
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: response.mensaje,
                            confirmButtonText: 'Aceptar',
                            buttonsStyling: false,
                            customClass: {
                                title: 'fs-5',
                                icon: 'h6 mt-3',
                                confirmButton: 'btn btn-danger'
                            }
                        })
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    // Manejar errores de la solicitud AJAX aquí
                    console.log("Error en la solicitud AJAX:", errorThrown);
                }
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Falta el nombre del usuario o la contraseña<br> <span class="fs-6">( Asegúrese de ingresar ambos datos e intente nuevamente )</span>',
                confirmButtonText: 'Aceptar',
                buttonsStyling: false,
                customClass: {
                    title: 'fs-5',
                    icon: 'h6 mt-3',
                    confirmButton: 'btn btn-danger'
                }
            })
            $('#btn-entrar').prop('disabled', true);
        };
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