$(document).ready(function () {
  const URL_SERVER = "http://localhost:3000/api/";

  //cuando hago click me lleva a pagina de inicio de iniciar sesion
  $('#id_link_inicio').click(function () {
    $(location).attr('href', './index.html');
  });

  //cuando hago click me lleva a pagina de usuarios
  $('#id_usuarios_nav').click(function () {
    $(location).attr('href', './usuarios.html');
  });

  //cuando hago click me lleva a pagina de productos
  $('#id_productos_nav').click(function () {
    $(location).attr('href', './productos.html');
  });

  //cierro sesion al hacer click
  $('#id_link_cerrar').click(function () {
    Swal.fire({
      title: 'Salir',
      html: '¿Desea cerrar sesion?',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar!',
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
        localStorage.removeItem("usuario");
        localStorage.removeItem("imagen");
        localStorage.removeItem("id_usuario");
        $(location).attr('href', '../lock/index.html');
      }
    });
  });

  //si estoy en la pagina inicio y hay usuario registrado lo muestro en el menu
  if (window.location.href.indexOf('index.html') > -1) {
    let usuario = localStorage.getItem('usuario');
    let imagen = localStorage.getItem('imagen');
    if (usuario !== null) {
      $('#id_link_registrate').html('<img class="img-fluid rounded-circle me-1" src="../imgUsuarios/' + imagen + '" alt="Imagen de usuario" width="30" height="30" id="img_usuario"> ' + usuario);
      $('#id_productos_nav, #id_usuarios_nav, #id_link_cerrar').removeClass('ocultar');
    } else {
      $(location).attr('href', '../lock/index.html');
    }
  }

  //si estoy en la pagina inicio y hay usuario registrado lo muestro en el menu
  if (window.location.href.indexOf('usuarios.html') > -1) {
    let usuario = localStorage.getItem('usuario');
    let imagen = localStorage.getItem('imagen');
    if (usuario !== null) {
      $('#id_link_registrate').html('<img class="img-fluid rounded-circle me-1" src="../imgUsuarios/' + imagen + '" alt="Imagen de usuario" width="30" height="30" id="img_usuario"> ' + usuario);
      $('#id_productos_nav, #id_usuarios_nav, #id_link_cerrar').removeClass('ocultar');

      listar_Usuarios()

    } else {
      $(location).attr('href', '../lock/index.html');
    }
  }

  if (window.location.href.indexOf('productos.html') > -1) {
    let usuario = localStorage.getItem('usuario');
    let imagen = localStorage.getItem('imagen');
    if (usuario !== null) {
      $('#id_link_registrate').html('<img class="img-fluid rounded-circle me-1" src="../imgUsuarios/' + imagen + '" alt="Imagen de usuario" width="30" height="30" id="img_usuario"> ' + usuario);
      $('#id_productos_nav, #id_usuarios_nav, #id_link_cerrar').removeClass('ocultar');

      listar_Productos();

    } else {
      $(location).attr('href', '../lock/index.html');
    }
  }


  //INICIO USUARIOS ///////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //esta variable almacena la imagen recortada por croopie en usuarios
  let imgRecortada = ""; 

  //Cuando introducimos caracteres en el input nombre nos fijamos no supere los 50 caracteres
  $('#txt_nombreUsuario').on('input', function () {
    cantidadCaracteres('txt_nombreUsuario', 'spanMaxUsuario', 'restoUsuario', 100);
  });

  //Cuando introducimos caracteres en el input contraseña nos fijamos no supere los 50 caracteres
  $('#txt_Pass_A').on('input', function () {
    cantidadCaracteres('txt_Pass_A', 'spanMaxPassA', 'restoPassA', 50);
  });

  //Cuando introducimos caracteres en el input repetir contraseña nos fijamos no supere los 50 caracteres
  $('#txt_Pass_B').on('input', function () {
    cantidadCaracteres('txt_Pass_B', 'spanMaxPassB', 'restoPassB', 50);
  });

  //Cuando hacemos click en +agregar mostramos ventana modal agregar usuario.
  $('#btn-show-Agregar-Usuario').click(function () {
    $('#titulo-modal-usuario').html('<i class="fa-solid fa-plus"></i> Agregar Usuario');

    $('#btnAgregarUsuario').show();
    $('#btnModificarUsuario').hide();
    $('#spanMaxUsuario').hide();
    $('#spanMaxPassA').hide();
    $('#spanMaxPassB').hide();
    $('#modal-usuario').modal("show");
  });

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
  //Cuando hacemos click en el boton guardarmos el nuevo usuario.
  $('#btnAgregarUsuario').click(function () {
    if (ComprobarDatosAdministrador()) {

      var formData = new FormData($('#frmAgregarUsuario')[0]);
      formData.append('imgRecortada', imgRecortada);
      imgRecortada = "";

      $.ajax({
        type: "POST",
        url: URL_SERVER + "agregarUsuario",
        data: formData,
        contentType: false,
        processData: false,
        success: function (respuesta) {

          if (respuesta.estado > 0) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'El usuario fue agregado',
              showConfirmButton: false,
              timer: 1800,
              customClass: {
                title: 'fs-5',
                icon: 'h6'
              }
            })
            listar_Usuarios();
            $('#modal-usuario').modal("hide");
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: respuesta.mensaje,
              confirmButtonText: 'Aceptar',
              buttonsStyling: false,
              customClass: {
                title: 'fs-5',
                icon: 'h6',
                confirmButton: 'btn btn-danger'
              }
            })
          }

        }
      });

    };
  });

  //Cuando hacemos click en el boton modificamos el usuario.
  $('#btnModificarUsuario').click(function () {

    let pass_A_B = 0;

    if ($('#txt_Pass_A').val() != "" || $('#txt_Pass_B').val() != "") {
      pass_A_B = 1;
    };

    if (ComprobarDatosAdministrador(pass_A_B)) {

      var formData = new FormData($('#frmAgregarUsuario')[0]);
      formData.append('pass_A_B', pass_A_B);
      formData.append('imgRecortada', imgRecortada);

      imgRecortada = "";

      $.ajax({
        type: "POST",
        url: URL_SERVER + "modificarUsuario",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.estado > 0) {

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'El usuario fue modificado',
              showConfirmButton: false,
              timer: 1800,
              customClass: {
                title: 'fs-5',
                icon: 'h6'
              }
            })
            listar_Usuarios();

            let id_usuarioLS = localStorage.getItem('id_usuario');

            if (id_usuarioLS == data.id_usuario) {
              console.log('modifico y actualizo!!!');
              localStorage.setItem("usuario", data.usuario);
              localStorage.setItem("imagen", data.imagen);

              $('#id_link_registrate').html('<img class="img-fluid rounded-circle me-1" src="../imgUsuarios/' + data.imagen + '" alt="Imagen de usuario" width="30" height="30" id="img_usuario"> ' + data.usuario);
            }

            $('#modal-usuario').modal("hide");

          } else {

            Swal.fire({
              position: 'center',
              icon: 'error',
              title: data.mensaje,
              confirmButtonText: 'Aceptar',
              buttonsStyling: false,
              customClass: {
                title: 'fs-5',
                icon: 'h6',
                confirmButton: 'btn btn-danger'
              }
            })

          }
        }
      });
    };
  })

  //Esta función comprueba que ninguno de los campos quede sin datos antes de guardar en el modal usuario.
  function ComprobarDatosAdministrador(pass_A_B = 1) {
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
    } else if ($('#imgResultado')[0].naturalHeight == 0) {
      $('#error_Imagen').removeClass('ocultar');
      $('#error_Imagen').text('Falta seleccionar una imagen ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#fil_imagenUsuario').addClass('error');
      $("#fil_imagenUsuario").focus();
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
  $('#fil_imagenUsuario').click(function () {
    $('#fil_imagenUsuario').removeClass('error');
    $('#error_Imagen').addClass('ocultar');
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

  //Cuando se cierra la ventana modal "modal-usuario" se resetean todos los valores
  $('#modal-usuario').on('hidden.bs.modal', function () {
    $('#txt_nombreUsuario').removeClass('error');
    $('#error_nombre_usuario').addClass('ocultar');

    $('#imgResultado').attr('src', "");
    $('#fil_imagenUsuario').removeClass('error');
    $("#fil_imagenUsuario").val(null);
    $('#id-ver-croppie').hide();
    $('#ver-resultado').hide();
    $('#error_Imagen').addClass('ocultar');

    $('#txt_Pass_A').removeClass('error');
    $('#error_Pass_A').addClass('ocultar');

    $('#txt_Pass_B').removeClass('error');
    $('#error_Pass_B').addClass('ocultar');

    $('#txt_Pass_A').attr('type', 'password');
    $('#txt_Pass_B').attr('type', 'password');
    $('#id-icono-A').removeClass('fa-eye').addClass('fa-eye-slash');
    $("#frmAgregarUsuario")[0].reset();
  });

  ////Inicio Croppie Usuario ///////////////////////////////////////////////////////////////////////////////////////
  //Referenciamos la biblioteca croppie en el img id:imgVistaPrevia. del modal  usuario
  $image_crop = $('#imgVistaPrevia').croppie({
    enableExif: true,
    viewport: {
      width: 180,
      height: 180,
      type: 'square' //circle
    },
    boundary: {
      width: 250,
      height: 250
    }
  });

  //cuando en input file seleccionamos una imagen la asignamos al objeto croppie del modal  usuario.
  $('#fil_imagenUsuario').change(function () {
    const file = this.files[0];
    if (file) {
      //Extraigo la extension del input para saber si es una imagen valida.
      var archivo = $(this).val();
      var extension = archivo.substring(archivo.lastIndexOf("."));
      var arreglo = [".jpg", ".jpeg", ".png",];
      if (jQuery.inArray(extension, arreglo) < 0) {
        Swal.fire({
          icon: 'error',
          html: 'El archivo seleccionado no es una imágen, intente nuevamente.',
          buttonsStyling: false,
          customClass: {
            icon: 'h6',
            confirmButton: 'btn btn-danger'
          }
        });
        $("#fil_imagenUsuario").val(null);
        $('#fil_imagenUsuario').addClass('error');
        $("#fil_imagenUsuario").focus();
      } else {
        let reader = new FileReader();
        reader.onload = function (event) {
          $image_crop.croppie('bind', {
            url: event.target.result
          });
        };
        reader.readAsDataURL(file);
        $('#id-ver-croppie').show(100); //le damos un pequeño retardo al aparecer.
      }
    }
  });

  //al salvar el recorte de croppie lo asignamos en una vista previa en un img id:imgResultado del modal  usuario.
  $('#btn-salvar').click(function () {
    $('#fil_imagenUsuario').removeClass('error');
    $("#fil_imagenUsuario").val(null); //borrar valores input file.
    $image_crop.croppie('result', {
      type: 'base64',
      format: 'jpeg',
      size: { width: 80, height: 80 },
    }).then(function (resp) {
      imgRecortada = "";
      imgRecortada = resp;
      $('#ver-resultado').show(100);
      $('#imgResultado').attr('src', imgRecortada);
    });
    $('#id-ver-croppie').hide();
  });
  ////fin Croppie usuario //////////////////////////////////////////////////////////////////////////////////////////

  //Cuando hacemos click en algun editar de alguna fila de la tabla administradores
  $('#tbl_usuarios tbody').on('click', '.modificar-usuario', function () {
    let id_usuario = $(this).attr("id");
    let img_usuario = $(this).attr("data-imagen");

    var fila = $(this).closest("tr");
    var primerCelda = fila.find("td:first").text();

    //console.log(id_usuario + ' -- ' + primerCelda + ' -- ' + img_usuario)
    $('#titulo-modal-usuario').html('<i class="fa-regular fa-pen-to-square"></i> Modificar Usuario');

    $('#btnAgregarUsuario').hide();
    $('#btnModificarUsuario').show();
    $('#spanMaxUsuario').hide();

    $('#txt_nombreUsuario').val(primerCelda);

    $('#imgResultado').attr('src', '../imgUsuarios/' + img_usuario);
    $('#ver-resultado').show();

    //estos input esta oculto
    $('#txt_id_Usuario').val(id_usuario);
    $('#txt_nomImgOculto').val(img_usuario);

    $('#modal-usuario').modal("show");

  });

  //Cuando hacemos click en algun editar de alguna fila de la tabla administradores
  $('#tbl_usuarios tbody').on('click', '.eliminar-usuario', function () {
    let id_usuario = $(this).attr("id");
    let img_usuario = $(this).attr("data-imagen");

    var fila = $(this).closest("tr");
    var primerCelda = fila.find("td:first").text();

    Swal.fire({
      title: 'Eliminar',
      html: '¿Desea eliminar el usuario: <b class="text-danger">' + primerCelda + '</b>?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
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
        $.ajax({
          type: 'POST',
          url: URL_SERVER + "eliminarUsuario",
          data: {
            id_Usuario: id_usuario,
            img_Usuario: img_usuario
          },
          success: function (response) {

            if (response.estado > 0) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El usuario fue eliminado',
                showConfirmButton: false,
                timer: 1800,
                customClass: {
                  title: 'fs-5',
                  icon: 'h6'
                }
              })
              listar_Usuarios();
              //console.log(response)
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
      };
    });


  });



  //Cuando se ve el modal usuario hago focus en el input nombre
  $('#modal-usuario').on('shown.bs.modal', function () {
    $("#txt_nombreUsuario").focus();
  });

  function listar_Usuarios() {
    $.ajax({
      type: 'GET',
      url: URL_SERVER + "usuarios",
      success: function (response) {
        let id_usuario = localStorage.getItem('id_usuario');
        $("#tbl_usuarios tbody").empty();
        for (let i = 0; i < response.length; i++) { //<td><img class="rounded-2" src="../imgAutor/' + response[i].imagenUsuario + '" alt="" width="40"></td>
          if (id_usuario == response[i]._id) {

            $("#tbl_usuarios tbody").append('<tr><td>' + response[i].nombreUsuario + '</td><td><img class="rounded-2" src="../imgUsuarios/' + response[i].imagenUsuario + '" alt="" width="40"></td><td><a class="text-success ps-3 a_personal modificar-usuario" name="modificar-usuario" id="' + response[i]._id + '" data-imagen="' + response[i].imagenUsuario + '"><i class="fa-solid fa-pen-to-square my-auto pe-1 fa-lg"></i>Modificar</a></td>    <td><a class="text-secondary ps-3 disabled"><i class="fa-regular fa-trash-can my-auto pe-1 fa-lg"></i>Eliminar</a></td></tr>');

          } else {

            $("#tbl_usuarios tbody").append('<tr><td>' + response[i].nombreUsuario + '</td><td><img class="rounded-2" src="../imgUsuarios/' + response[i].imagenUsuario + '" alt="" width="40"></td><td><a class="text-success ps-3 a_personal modificar-usuario" name="modificar-usuario" id="' + response[i]._id + '" data-imagen="' + response[i].imagenUsuario + '"><i class="fa-solid fa-pen-to-square my-auto pe-1 fa-lg"></i>Modificar</a></td>    <td><a class="text-danger ps-3 a_personal eliminar-usuario" name="eliminar-usuario" id="' + response[i]._id + '" data-imagen="' + response[i].imagenUsuario + '"><i class="fa-regular fa-trash-can my-auto pe-1 fa-lg"></i>Eliminar</a></td></tr>');

          }

        }

      },
      error: function (xhr, textStatus, errorThrown) {
        // Manejar errores de la solicitud AJAX aquí
        console.log("Error en la solicitud AJAX:", errorThrown);
      }
    });
  }

  //FIN USUARIOS /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  //INICIO PRODUCTOS ///////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //esta variable almacena la imagen recortada por croopie en producto
  let imgRecortadaProducto = ""; 

  //Cuando introducimos caracteres en el input nombre nos fijamos no supere los 50 caracteres
  $('#txt_nombreProducto').on('input', function () {
    cantidadCaracteres('txt_nombreProducto', 'spanMaxProducto', 'restoProducto', 100);
  });

  //le damos formato de precio al input precio
  $('#txt_Precio').inputmask({
    alias: "numeric",
    placeholder: "0",
    autoGroup: true,
    integerDigits: 8,
    digits: 0,
    digitsOptional: false,
    clearMaskOnLostFocus: false
  });

  //le damos formato de numero al input stock
  $('#txt_Stock').inputmask({
    alias: "numeric",
    placeholder: "0",
    autoGroup: true,
    integerDigits: 5,
    digits: 0,
    digitsOptional: false,
    clearMaskOnLostFocus: false
  });

  //le damos formato de numero al input stock
  $('#txt_Potencia').inputmask({
    alias: "numeric",
    placeholder: "0",
    autoGroup: true,
    integerDigits: 5,
    digits: 0,
    digitsOptional: false,
    clearMaskOnLostFocus: false
  });


  //Cuando hacemos click en +agregar mostramos ventana modal agregar usuario.
  $('#btn-show-Agregar-Producto').click(function () {
    $('#titulo-modal-producto').html('<i class="fa-solid fa-plus"></i> Agregar Producto');

    $('#btnAgregarProducto').show();
    $('#btnModificarProducto').hide();
    $('#spanMaxProducto').hide();

    $('#spanMaxPassA').hide();
    $('#spanMaxPassB').hide();

    $('#modal-producto').modal("show");
  });

  //Cuando hacemos click en el boton guardarmos el nuevo usuario.
  $('#btnAgregarProducto').click(function () {
    if (ComprobarDatosProducto()) {

      var formData = new FormData($('#frmAgregarProducto')[0]);
      formData.append('imgRecortadaProducto', imgRecortadaProducto);
      imgRecortadaProducto = "";

      $.ajax({
        type: "POST",
        url: URL_SERVER + "agregarProducto",
        data: formData,
        contentType: false,
        processData: false,
        success: function (respuesta) {

          if (respuesta.estado > 0) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'El producto fue agregado',
              showConfirmButton: false,
              timer: 1800,
              customClass: {
                title: 'fs-5',
                icon: 'h6'
              }
            })
            listar_Productos();
            $('#modal-producto').modal("hide");
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: respuesta.mensaje,
              confirmButtonText: 'Aceptar',
              buttonsStyling: false,
              customClass: {
                title: 'fs-5',
                icon: 'h6',
                confirmButton: 'btn btn-danger'
              }
            })
          }

        }
      });

    };
  });

  //Cuando hacemos click en el boton modificamos el usuario.
  $('#btnModificarProducto').click(function () {

    if (ComprobarDatosProducto()) {

      var formData = new FormData($('#frmAgregarProducto')[0]);
      formData.append('imgRecortadaProducto', imgRecortadaProducto);

      imgRecortadaProducto = "";

      $.ajax({
        type: "POST",
        url: URL_SERVER + "modificarProducto",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.estado > 0) {

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'El producto fue modificado',
              showConfirmButton: false,
              timer: 1800,
              customClass: {
                title: 'fs-5',
                icon: 'h6'
              }
            })
            listar_Productos();

            $('#modal-producto').modal("hide");

          } else {

            Swal.fire({
              position: 'center',
              icon: 'error',
              title: data.mensaje,
              confirmButtonText: 'Aceptar',
              buttonsStyling: false,
              customClass: {
                title: 'fs-5',
                icon: 'h6',
                confirmButton: 'btn btn-danger'
              }
            })

          }
        }
      });
    };
  })

  //Esta función comprueba que ninguno de los campos quede sin datos antes de guardar en el modal usuario.
  function ComprobarDatosProducto() {
    if ($('#txt_nombreProducto').val() == "") {
      $('#txt_nombreProducto').addClass('error');
      $('#error_nombre_Producto').removeClass('ocultar');
      $('#error_nombre_Producto').text('Falta el nombre del producto ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $("#txt_nombreProducto").focus();
      return false;
    } else if ($('#imgResultadoProducto')[0].naturalHeight == 0) {
      $('#error_ImagenProducto').removeClass('ocultar');
      $('#error_ImagenProducto').text('Falta seleccionar una imagen ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#fil_imagenProducto').addClass('error');
      $("#fil_imagenProducto").focus();
      return false;
    } else if ($('#txt_Precio').val() <= 0) {
      $('#error_Precio').removeClass('ocultar');
      $('#error_Precio').text('Falta ingresar el precio ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#txt_Precio').addClass('error');
      $("#txt_Precio").focus();
      return false;
    } else if ($('#txt_Stock').val() <= 0) {
      $('#error_Stock').removeClass('ocultar');
      $('#error_Stock').text('Falta ingresar el stock ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#txt_Stock').addClass('error');
      $("#txt_Stock").focus();
      return false;
    } else if ($('#txt_Potencia').val() <= 0) {
      $('#error_Potencia').removeClass('ocultar');
      $('#error_Potencia').text('Falta ingresar la potencia ').append('<i class="fa-solid fa-circle-exclamation fa-lg"></i>');
      $('#txt_Potencia').addClass('error');
      $("#txt_Potencia").focus();
      return false;
    } else {
      return true;
    }
  };


  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal del modal usuario.
  $('#txt_nombreProducto').keyup(function () {
    if ($('#txt_nombreProducto').val() != "") {
      $('#txt_nombreProducto').removeClass('error');
      $('#error_nombre_Producto').addClass('ocultar');
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal del modal usuario.
  $('#fil_imagenProducto').click(function () {
    $('#fil_imagenProducto').removeClass('error');
    $('#error_ImagenProducto').addClass('ocultar');
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal del modal  usuario.
  $('#txt_Precio').keyup(function () {
    if ($('#txt_Precio').val() != "") {
      $('#txt_Precio').removeClass('error');
      $('#error_Precio').addClass('ocultar');
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal del modal  usuario
  $('#txt_Stock').keyup(function () {
    if ($('#txt_Stock').val() != "") {
      $('#txt_Stock').removeClass('error');
      $('#error_Stock').addClass('ocultar');
    }
  });

  //Cuando escribo un valor se borra el mensaje del placeholder y recupera el color normal del modal  usuario
  $('#txt_Potencia').keyup(function () {
    if ($('#txt_Potencia').val() != "") {
      $('#txt_Potencia').removeClass('error');
      $('#error_Potencia').addClass('ocultar');
    }
  });

  //Cuando se cierra la ventana modal "modal-producto" se resetean todos los valores
  $('#modal-producto').on('hidden.bs.modal', function () {
    $('#txt_nombreProducto').removeClass('error');
    $('#error_nombre_Producto').addClass('ocultar');

    $('#imgResultadoProducto').attr('src', "");
    $('#fil_imagenProducto').removeClass('error');
    $("#fil_imagenProducto").val(null);
    $('#id-ver-croppieProducto').hide();
    $('#ver-resultadoProducto').hide();
    $('#error_ImagenProducto').addClass('ocultar');

    $('#txt_Precio').removeClass('error');
    $('#error_Precio').addClass('ocultar');

    $('#txt_Stock').removeClass('error');
    $('#error_Stock').addClass('ocultar');

    $('#txt_Potencia').removeClass('error');
    $('#error_Potencia').addClass('ocultar');

    $("#frmAgregarProducto")[0].reset();
  });

  ////Inicio Croppie Usuario ///////////////////////////////////////////////////////////////////////////////////////
  //Referenciamos la biblioteca croppie en el img id:imgVistaPreviaProducto. del modal  usuario
  $image_cropProducto = $('#imgVistaPreviaProducto').croppie({
    enableExif: true,
    viewport: {
      width: 180,
      height: 180,
      type: 'square' //circle
    },
    boundary: {
      width: 250,
      height: 250
    }
  });

  //cuando en input file seleccionamos una imagen la asignamos al objeto croppie del modal  usuario.
  $('#fil_imagenProducto').change(function () {
    const file = this.files[0];
    if (file) {
      //Extraigo la extension del input para saber si es una imagen valida.
      var archivo = $(this).val();
      var extension = archivo.substring(archivo.lastIndexOf("."));
      var arreglo = [".jpg", ".jpeg", ".png",];
      if (jQuery.inArray(extension, arreglo) < 0) {
        Swal.fire({
          icon: 'error',
          html: 'El archivo seleccionado no es una imágen, intente nuevamente.',
          buttonsStyling: false,
          customClass: {
            icon: 'h6',
            confirmButton: 'btn btn-danger'
          }
        });
        $("#fil_imagenProducto").val(null);
        $('#fil_imagenProducto').addClass('error');
        $("#fil_imagenProducto").focus();
      } else {
        let reader = new FileReader();
        reader.onload = function (event) {
          $image_cropProducto.croppie('bind', {
            url: event.target.result
          });
        };
        reader.readAsDataURL(file);
        $('#id-ver-croppieProducto').show(100); //le damos un pequeño retardo al aparecer.
      }
    }
  });

  //al salvar el recorte de croppie lo asignamos en una vista previa en un img id:imgResultadoProducto del modal  usuario.
  $('#btn-salvarProducto').click(function () {
    $('#fil_imagenProducto').removeClass('error');
    $("#fil_imagenProducto").val(null); //borrar valores input file.
    $image_cropProducto.croppie('result', {
      type: 'base64',
      format: 'jpeg',
      size: { width: 600, height: 600 },
    }).then(function (resp) {
      imgRecortadaProducto = "";
      imgRecortadaProducto = resp;
      $('#ver-resultadoProducto').show(100);
      $('#imgResultadoProducto').attr('src', imgRecortadaProducto);
    });
    $('#id-ver-croppieProducto').hide();
  });
  ////fin Croppie usuario //////////////////////////////////////////////////////////////////////////////////////////

  //Cuando hacemos click en algun editar de alguna fila de la tabla administradores
  $('#tbl_productos tbody').on('click', '.modificar-producto', function () {
    let id_producto = $(this).attr("id");
    let img_producto = $(this).attr("data-imagen");

    var fila = $(this).closest("tr");
    var nombreProducto = fila.find("td:first").text();
    var precioProducto = fila.find("td").eq(2).text(); // Tercera celda
    var stockProducto = fila.find("td").eq(3).text();  // Cuarta celda
    var potenciaProducto = fila.find("td").eq(4).text();  // Quinta celda

    //console.log(id_producto + ' -- ' + primerCelda + ' -- ' + img_producto)
    $('#titulo-modal-producto').html('<i class="fa-regular fa-pen-to-square"></i> Modificar Producto');

    $('#btnAgregarProducto').hide();
    $('#btnModificarProducto').show();
    $('#spanMaxProducto').hide();

    $('#txt_nombreProducto').val(nombreProducto);
    $('#txt_Precio').val(precioProducto);
    $('#txt_Stock').val(stockProducto);
    $('#txt_Potencia').val(potenciaProducto);

    $('#imgResultadoProducto').attr('src', '../imgProductos/' + img_producto);
    $('#ver-resultadoProducto').show();

    //estos input esta oculto
    $('#txt_id_Producto').val(id_producto);
    $('#txt_ImgOcultoProducto').val(img_producto);

    $('#modal-producto').modal("show");

  });

  //Cuando hacemos click en algun editar de alguna fila de la tabla administradores
  $('#tbl_productos tbody').on('click', '.eliminar-producto', function () {
    let id_producto = $(this).attr("id");
    let img_producto = $(this).attr("data-imagen");

    var fila = $(this).closest("tr");
    var nombreProducto = fila.find("td:first").text();

    Swal.fire({
      title: 'Eliminar',
      html: '¿Desea eliminar el usuario: <b class="text-danger">' + nombreProducto + '</b>?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
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
        $.ajax({
          type: 'POST',
          url: URL_SERVER + "eliminarProducto",
          data: {
            id_Producto: id_producto,
            img_Producto: img_producto
          },
          success: function (response) {

            if (response.estado > 0) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El usuario fue eliminado',
                showConfirmButton: false,
                timer: 1800,
                customClass: {
                  title: 'fs-5',
                  icon: 'h6'
                }
              })
              listar_Productos();
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
      };
    });


  });



  //Cuando se ve el modal usuario hago focus en el input nombre
  $('#modal-producto').on('shown.bs.modal', function () {
    $("#txt_nombreProducto").focus();
  });

  function listar_Productos() {
    $.ajax({
      type: 'GET',
      url: URL_SERVER + "productos",
      success: function (response) {

        $("#tbl_productos tbody").empty();

        for (let i = 0; i < response.length; i++) {
          $("#tbl_productos tbody").append('<tr><td>' + response[i].nombreProducto + '</td><td><img class="rounded-2" src="../imgProductos/' + response[i].imagenProducto + '" alt="" width="40"></td><td> $' + response[i].precioProducto + '</td><td>' + response[i].cantidadProducto + '</td><td>' + response[i].potenciaProducto + '</td><td><a class="text-success ps-3 a_personal modificar-producto" name="modificar-producto" id="' + response[i]._id + '" data-imagen="' + response[i].imagenProducto + '"><i class="fa-solid fa-pen-to-square my-auto pe-1 fa-lg"></i>Modificar</a></td>    <td><a class="text-danger ps-3 a_personal eliminar-producto" name="eliminar-producto" id="' + response[i]._id + '" data-imagen="' + response[i].imagenProducto + '"><i class="fa-regular fa-trash-can my-auto pe-1 fa-lg"></i>Eliminar</a></td></tr>');
        }

      },
      error: function (xhr, textStatus, errorThrown) {
        // Manejar errores de la solicitud AJAX aquí
        console.log("Error en la solicitud AJAX:", errorThrown);
      }
    });
  }

  //FIN PRODUCTOS /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});

//Funcion que elimina todos los caracteres que no sean permitidos en el nombre
function limpiarAdmin(valorBusqueda = "") {
  let valorActual = valorBusqueda;
  let valorLimpio = valorActual.replace(/[^A-Za-z0-9_-]/g, '');
  return valorLimpio;
};


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