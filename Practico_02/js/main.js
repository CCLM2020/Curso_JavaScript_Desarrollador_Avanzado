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
  $('#btn1').click(function () {
    alert('¡Hiciste clic en el Botón 1!');
  });

  $('#btn2').click(function () {
    alert('¡Hiciste clic en el Botón 2!');
  });

  $('#btn3').click(function () {
    alert('¡Hiciste clic en el Botón 3!');
  });

  //Para el formulario del ejercicio 7///////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  //Cuando introducimos caracteres en el input nombre nos fijamos no supere los 50 caracteres
  $('#txt_nombreUsuario').on('input', function () {
    cantidadCaracteres('txt_nombreUsuario', 'spanMaxUsuario', 'restoUsuario', 50);
  });

  //Cuando introducimos caracteres en el input email nos fijamos no supere los 100 caracteres
  $('#txt_emailUsuario').on('input', function () {
    cantidadCaracteres('txt_emailUsuario', 'spanMaxEmail', 'restoEmail', 100);
  });

  $('#txt_emailUsuario_B').on('input', function () {
    cantidadCaracteres('txt_emailUsuario_B', 'spanMaxEmail_B', 'restoEmail_B', 100);
  });

  //Cuando introducimos caracteres en el input contraseña nos fijamos no supere los 50 caracteres
  $('#txt_Pass_A').on('input', function () {
    cantidadCaracteres('txt_Pass_A', 'spanMaxPassA', 'restoPassA', 50);
  });

  //Cuando introducimos caracteres en el input repetir contraseña nos fijamos no supere los 50 caracteres
  $('#txt_Pass_B').on('input', function () {
    cantidadCaracteres('txt_Pass_B', 'spanMaxPassB', 'restoPassB', 50);
  });

  $('#spanMaxUsuario').hide();
  $('#spanMaxEmail').hide();
  $('#spanMaxEmail_B').hide();
  $('#spanMaxPassA').hide();
  $('#spanMaxPassB').hide();

  //cuando click en el icono ver password dejor ver el texto o lo oculto
  //cuando click en el icono ver password dejor ver el texto de contraseña
  $('#id-icono-passA').click(function () {

    var passwordInputA = $('#txt_Pass_A');
    var passwordInputB = $('#txt_Pass_B');
    var passwordType = passwordInputA.attr('type');

    if (passwordType === 'password') {
      passwordInputA.attr('type', 'text');
      passwordInputB.attr('type', 'text');
      $('#id-icono-A').removeClass('fa-eye-slash').addClass('fa-eye');
    } else {
      passwordInputA.attr('type', 'password');
      passwordInputB.attr('type', 'password');
      $('#id-icono-A').removeClass('fa-eye').addClass('fa-eye-slash');
    }
  });

  //si hago click en cancelar simulo que salgo del formulario
  $('#btnCancelarUsuario').click(function () {
    alert('se cancela el formulario, saliendo...');
  });

  //Cuando hacemos click en el boton guardarmos el nuevo usuario.
  $('#btnAgregarUsuario').click(function () {
    if (ComprobarDatosUsuario()) {

      alert('Agregando usuario, saliendo...');

    };
  });

  //Esta función comprueba que ninguno de los campos quede sin datos antes de guardar en el modal usuario.
  function ComprobarDatosUsuario(pass_A_B = 1) {
    if ($('#txt_nombreUsuario').val() == "") {
      $('#txt_nombreUsuario').addClass('error');
      $('#error_nombre_usuario').removeClass('ocultar');
      $('#error_nombre_usuario').text('Falta el nombre del usuario ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $("#txt_nombreUsuario").focus();
      return false;
    } else if (!validarNombre('txt_nombreUsuario')) {
      $('#error_nombre_usuario').removeClass('ocultar');
      $('#error_nombre_usuario').text('El nombre puede incluir letras, números y caracteres ( _ y - ) sín espacios en blanco ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#txt_nombreUsuario').addClass('error');
      $("#txt_nombreUsuario").focus();
      return false;
    } else if ($('#txt_emailUsuario').val() == "") {
      $('#error_Email').removeClass('ocultar');
      $('#error_Email').text('Falta ingresar el email ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#txt_emailUsuario').addClass('error');
      $("#txt_emailUsuario").focus();
      return false;
    } else if (!validarFormatoEmail('txt_emailUsuario')) {
      $('#error_Email').removeClass('ocultar');
      $('#error_Email').text('Utilice un formato de correo válido (ejemplo: miCorreo@correo.com) ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#txt_emailUsuario').addClass('error');
      $("#txt_emailUsuario").focus();
      return false;
    } else if ($('#txt_emailUsuario_B').val() == "") {
      $('#error_Email_B').removeClass('ocultar');
      $('#error_Email_B').text('Falta ingresar el email ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#txt_emailUsuario_B').addClass('error');
      $("#txt_emailUsuario_B").focus();
      return false;
    } else if (!validarFormatoEmail('txt_emailUsuario_B')) {
      $('#error_Email_B').removeClass('ocultar');
      $('#error_Email_B').text('Utilice un formato de correo válido (ejemplo: miCorreo@correo.com) ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#txt_emailUsuario_B').addClass('error');
      $("#txt_emailUsuario_B").focus();
      return false;
    } else if (!comprobarIgualdad('txt_emailUsuario', 'txt_emailUsuario_B')) {
      $('#error_Email').removeClass('ocultar');
      $('#error_Email').text('Los correos son distintos ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#txt_emailUsuario').addClass('error');
      $('#txt_emailUsuario_B').addClass('error');
      $("#txt_emailUsuario").focus();
      return false;
    } else if (pass_A_B == 1) {
      if ($('#txt_Pass_A').val() == "") {
        $('#error_Pass_A').removeClass('ocultar');
        $('#error_Pass_A').text('Falta ingresar la contraseña ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
        $('#txt_Pass_A').addClass('error');
        $("#txt_Pass_A").focus();
        return false;
      } else if ($('#txt_Pass_B').val() == "") {
        $('#error_Pass_B').removeClass('ocultar');
        $('#error_Pass_B').text('Falta ingresar la contraseña ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
        $('#txt_Pass_B').addClass('error');
        $("#txt_Pass_B").focus();
        return false;
      } else if (!comprobarIgualdad('txt_Pass_A', 'txt_Pass_B')) {
        $('#error_Pass_A').removeClass('ocultar');
        $('#error_Pass_A').text('Las contraseñas son distintas ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
        $('#txt_Pass_A').addClass('error');
        $('#txt_Pass_B').addClass('error');
        $("#txt_Pass_A").focus();
        return false;
      } else if (!checkPassword('txt_Pass_A', 'error_Pass_A')) {
        $('#txt_Pass_A').addClass('error');
        $('#txt_Pass_B').addClass('error');
        $("#txt_Pass_A").focus();
        return false;
      } else {
        return true;
      };
    } else {
      return true;
    }
  };


  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal del modal usuario.
  $('#txt_nombreUsuario').keyup(function () {
    if ($('#txt_nombreUsuario').val() != "") {
      $('#txt_nombreUsuario').removeClass('error');
      $('#error_nombre_usuario').addClass('ocultar');
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal del modal usuario.
  $('#txt_emailUsuario').keyup(function () {
    if ($('#txt_emailUsuario').val() != "") {
      $('#txt_emailUsuario').removeClass('error');
      $('#error_Email').addClass('ocultar');
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal del modal usuario.
  $('#txt_emailUsuario_B').keyup(function () {
    if ($('#txt_emailUsuario_B').val() != "") {
      $('#txt_emailUsuario_B').removeClass('error');
      $('#error_Email_B').addClass('ocultar');
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal del modal  usuario.
  $('#txt_Pass_A').keyup(function () {
    if ($('#txt_Pass_A').val() != "") {
      $('#txt_Pass_A').removeClass('error');
      $('#error_Pass_A').addClass('ocultar');
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal del modal  usuario
  $('#txt_Pass_B').keyup(function () {
    if ($('#txt_Pass_B').val() != "") {
      $('#txt_Pass_B').removeClass('error');
      $('#error_Pass_B').addClass('ocultar');
    }
  });
});

//esta funcion me devuelve verdadero si el formato de un usuario es valido que permitir letras, números, _ y -.
function validarNombre(inputId) {
  var inputNombre = $('#' + inputId);
  var nombre = inputNombre.val();

  var caracterValido = /^[A-Za-z0-9_\-]+$/; // Expresión regular para permitir letras, números, _ y -

  if (!caracterValido.test(nombre)) {
    // El campo contiene caracteres no permitidos
    return false;
  } else {
    // El campo es válido
    return true;
  }
}


//esta funcion me devuelve verdadero si el formato de un email es valido
function validarFormatoEmail(inputId) {
  var emailInput = $('#' + inputId);
  var email = emailInput.val();

  // Expresión regular para verificar el formato de correo electrónico
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}

//esta funcion me permite contar la cantidad de caracteres en un input y decirle cuantos le quedan o llego a la maxima cantidad.
function cantidadCaracteres(inputId, spanMaxId, restoId, cantidad) {
  let var_Input = $('#' + inputId);
  let var_spanMax = $('#' + spanMaxId);
  let var_resto = $('#' + restoId);
  let inputVal = var_Input.val();
  let inputLength = inputVal.length;

  if (inputLength > cantidad || inputLength === cantidad) {
    var_Input.val(var_Input.val().substring(0, cantidad));
    var_Input.attr('maxlength', cantidad);
    var_spanMax.css("color", "red");
    var_spanMax.show();
    var_resto.html(cantidad - var_Input.val().length);
  } else if ((inputLength > 0) && ((inputLength < cantidad))) {
    var_resto.html(cantidad - var_Input.val().length);
    var_spanMax.show();
    var_spanMax.css("color", "#c6c7c8");
  } else {
    var_spanMax.hide();
  };
}

//esta funcion me permite verificar si dos input son iguales por ejemplo para contraseñas o correos electronicos.
function comprobarIgualdad(inputId_A, inputId_B) {
  let input_A = $('#' + inputId_A);
  let input_B = $('#' + inputId_B);

  input_A = input_A.val();
  input_B = input_B.val();

  if (input_A === input_B) {
    return true;
  } else {
    return false;
  };
};

//esta funcion me permite verficar la contraseña cumpla los requisitos de:
//tener al menos 8 caracteres, incluir una combinación de letras (mayúsculas y minúsculas)
//números y caracteres especiales (por ejemplo, !, @, #, $, %)
function checkPassword(inputPass, idSpan) {
  let input = $('#' + inputPass);
  let span = $('#' + idSpan);
  let pass = input.val();

  // Verificar la longitud mínima
  if (pass.length < 8) {
    span.text('La contraseña debe tener al menos 8 caracteres').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
    span.removeClass('ocultar');
    return false;
  }

  // Verificar la combinación de letras (mayúsculas y minúsculas), números y caracteres especiales
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!]).+$/;
  if (!regex.test(pass)) {
    span.text('Se debe incluir letras (mayúsculas y minúsculas), números y caracteres especiales').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
    span.removeClass('ocultar');
    return false;
  }

  return true;
}