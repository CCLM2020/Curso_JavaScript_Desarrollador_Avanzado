$(document).ready(function () {
    const URL_SERVER = "http://localhost:3000/api/";

    //si estoy en la pagina inicio y hay usuario registrado lo muestro en el menu
    if (window.location.href.indexOf('index.html') > -1) {
        let usuario = localStorage.getItem('usuario');
        let imagen = localStorage.getItem('imagen');
        if (usuario !== null) {
            $('#id_link_registrate').html('<img class="img-fluid rounded-circle me-1" src="./imgUsuarios/' + imagen + '" alt="Imagen de usuario" width="30" height="30" id="img_usuario"> ' + usuario);
            $('#id_li_ir_a_admin').html('<a class="dropdown-item text-danger" href="./unlock/index.html" id="id_link_ir_Admin"><i class="fa-solid fa-user"></i> Administrador</a>');
            $('#id_li-login').html('<a class="dropdown-item text-danger" href="#" id="id_link_cerrar_Admin"><i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión</a>');
            $('#id_productos_nav, #id_usuarios_nav, #id_link_cerrar_Admin').removeClass('ocultar');
        } else {
            $('#id_link_registrate').html('<i class="fa-solid fa-user"></i>');
            $('#id_li-login').html('<a class="dropdown-item text-danger" href="#" id="id_link_login"><i class="fa-solid fa-key"></i> Iniciar Sesión</a>');
        }
    }

    //cierro sesion al hacer click
    $('#id_link_cerrar_Admin').click(function () {
        Swal.fire({
            title: 'Salir',
            html: '¿Desea cerrar sesion?',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar!',
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
                localStorage.removeItem("usuario");
                localStorage.removeItem("imagen");
                localStorage.removeItem("id_usuario");

                $('#id_li_ir_a_admin').html('');
                $('#id_link_registrate').html('<i class="fa-solid fa-user"></i>');
                $('#id_li-login').html('<a class="dropdown-item text-danger" href="#" id="id_link_login"><i class="fa-solid fa-key"></i> Iniciar Sesión</a>');
            }
        });
    });

    //para que el usuario se loguee
    $("body").on("click", "#id_link_login", function () {
        $(location).attr('href', './lock/index.html');
    });


    // Clase productos
    class Producto {
        constructor(nombre, precio, cantidadEnStock) {
            this.nombre = nombre;
            this.precio = precio;
            this.cantidadEnStock = cantidadEnStock;
        }

        // metodo para mostrar el producto
        mostrarInformacion() {
            console.log(`Nombre: ${this.nombre}`);
            console.log(`Precio: ${this.precio}`);
            console.log(`Cantidad en stock: ${this.cantidadEnStock}`);
        }
    }

    // clase hija para productos electronicos
    class ProductoElectronico extends Producto {
        constructor(nombre, precio, cantidadEnStock, potencia) {
            super(nombre, precio, cantidadEnStock);
            this.potencia = potencia;
        }

        // metodo para mostrar un producto electronico
        mostrarInformacion() {
            super.mostrarInformacion();
            console.log(`Potencia: ${this.potencia}`);
        }
    }

    // Clase hija para productos alimenticio
    class ProductoAlimenticio extends Producto {
        constructor(nombre, precio, cantidadEnStock, fechaCaducidad) {
            super(nombre, precio, cantidadEnStock);
            this.fechaCaducidad = fechaCaducidad;
        }

        // metodo para mostrar un producto alimenticio
        mostrarInformacion() {
            super.mostrarInformacion();
            console.log(`Fecha de caducidad: ${this.fechaCaducidad}`);
        }
    }

    // Clase Carrito
    class Carrito {
        constructor() {
            this.productos = [];
        }

        // Metodo para agregar un producto al carrito
        agregarProducto(producto) {
            this.productos.push(producto);
        }

        // mtodo para eliminar un producto del carrito
        eliminarProducto(producto) {
            for (let i = 0; i < this.productos.length; i++) {
                if (this.productos[i].nombre === producto) {
                    this.productos.splice(i, 1);
                    break;
                }
            }
        }

        // Metodo para calcular el total de la compra
        calcularTotal() {
            return this.productos.reduce((total, producto) => total + producto.precio, 0);
        }

        // Metodo para calcular el total de la compra
        calcularCantidad() {
            return this.productos.reduce((total, producto) => total + producto.cantidadEnStock, 0);
        }

        mostrarProductos() {
            $("#tbl_carrito tbody").empty();
            for (let i = 0; i < this.productos.length; i++) {
                let palabra = "";
                // Comprobar si el producto es de la clase ProductoAlimenticio
                if (this.productos[i] instanceof ProductoAlimenticio) {
                    palabra = "Fecha de caducidad: " + this.productos[i].fechaCaducidad;
                } else {
                    palabra = "Potencia: " + this.productos[i].potencia;
                }
                $("#tbl_carrito tbody").append('<tr><td>' + this.productos[i].nombre + '</td><td> $' + this.productos[i].precio + '</td><td>' + this.productos[i].cantidadEnStock + '</td><td>' + palabra + '</td><td><a class="text-danger ps-3 a_personal eliminar-producto" name="eliminar-producto" data-nombre="' + this.productos[i].nombre + '" title="Eliminar"><i class="fa-regular fa-trash-can my-auto pe-1 fa-lg"></i></a></td></tr>');
            }
        }

        vaciarCarrito() {
            this.productos.length = 0;
        }
    }

    // nuevo carrito
    const carrito = new Carrito();

    // creando array para productos
    let listadoProductos = [];

    //funcion para llenar el array y crear las card de los productos.
    listar_Productos();

    //cuando hago click en algun agregar al carrito
    $('body').on('click', '.agregar-carrito', function () {

        let index = $(this).attr("data-id");
        let tipo = $(this).attr("data-tipo");

        if (listadoProductos[index].cantidadEnStock > 0) {
            // Comprobar si el producto es de la clase ProductoAlimenticio
            if (tipo == "ProductoAlimenticio") {
                let p2 = new ProductoAlimenticio(listadoProductos[index].nombre, listadoProductos[index].precio, 1, listadoProductos[index].fechaCaducidad);
                carrito.agregarProducto(p2);
            } else {
                let p1 = new ProductoElectronico(listadoProductos[index].nombre, listadoProductos[index].precio, 1, listadoProductos[index].potencia);
                carrito.agregarProducto(p1);
            }
            listadoProductos[index].cantidadEnStock = (listadoProductos[index].cantidadEnStock - 1);
            $('#cantidad_' + index).text(listadoProductos[index].cantidadEnStock);

            if (listadoProductos[index].cantidadEnStock == 0) {
                $(this).closest('.agregar-carrito').addClass('disabled');
            }
        }

        $('#carrito_cantidad').text(carrito.calcularCantidad());
        $('#carrito_total').text('$' + carrito.calcularTotal());
        $('#cantidad_carrito').html(carrito.calcularCantidad());
        $('#total_carrito').html(carrito.calcularTotal());
        $('#ir_a_carrito').removeClass('disabled');
        $('#titulo_total').removeClass('d-none');
    });

    $('#ir_a_carrito').on('click', function () {
        carrito.mostrarProductos();
        $('#modal-carrito').modal("show");
    });

    //Cuando hacemos click en algun borrar de alguna fila de la tabla
    $('#tbl_carrito tbody').on('click', '.eliminar-producto', function () {
        //elimino la fila de la tabla
        $(this).closest("tr").remove();

        let productoBuscado = $(this).attr("data-nombre");
        //con esta funcion envio el nombre del producto lo busco en listadoProductos
        //y restablezco la cantidad que estaba en el carrito en el array listadoProductos.
        restauraProducto(productoBuscado);

        carrito.eliminarProducto(productoBuscado);

        actualizarValores();

    });

    $('#btnVaciarCarrito').on('click', function () {
        for (let i = 0; i < carrito.productos.length; i++) {
            restauraProducto(carrito.productos[i].nombre);
        }
        carrito.vaciarCarrito();

        actualizarValores();
    });

    function restauraProducto(productoBuscado) {
        //Busco en el array de los productos el elemento que borro del carrito
        //y obtengo el indice del producto encontrado
        //sino lo encuentra me devuelve -1
        let index = listadoProductos.findIndex(function (Buscado) {
            return Buscado.nombre === productoBuscado;
        });
        if (index > -1) {
            listadoProductos[index].cantidadEnStock = (listadoProductos[index].cantidadEnStock + 1);
            $('#cantidad_' + index).text(listadoProductos[index].cantidadEnStock);
            $('[data-id="' + index + '"]').removeClass('disabled');
        }
    }

    function actualizarValores() {
        $('#carrito_cantidad').text(carrito.calcularCantidad());
        $('#carrito_total').text('$' + carrito.calcularTotal());
        $('#cantidad_carrito').html(carrito.calcularCantidad());
        $('#total_carrito').html(carrito.calcularTotal());

        if (carrito.calcularCantidad() < 1) {
            $('#ir_a_carrito').addClass('disabled');
            $('#titulo_total').addClass('d-none');
            $('#modal-carrito').modal("hide");
        }
    }

    function listar_Productos() {
        $.ajax({
            type: 'GET',
            url: URL_SERVER + "productos",
            success: function (response) {

                //vacio el array antes de cargarlo.
                listadoProductos.length = 0;

                for (let i = 0; i < response.length; i++) {

                    listadoProductos.push(new ProductoElectronico(response[i].nombreProducto, response[i].precioProducto, response[i].cantidadProducto, response[i].potenciaProducto));
                    
                }

                //creo las cards de los productos
                let card = "";
                for (let i = 0; i < listadoProductos.length; i++) {

                    let palabra = "";
                    let tipo = "";
                    // Comprobar si el producto es de la clase ProductoAlimenticio o ProductoElectronico
                    if (listadoProductos[i] instanceof ProductoAlimenticio) {
                        palabra = "Fecha de caducidad: " + listadoProductos[i].fechaCaducidad;
                        tipo = "ProductoAlimenticio";
                    } else {
                        palabra = "Potencia: " + listadoProductos[i].potencia;
                        tipo = "ProductoElectronico";
                    }

                    card = '<div class="col">' + //-7 col-sm-6 col-lg-4 mx-auto mx-sm-0
                        '<div class="card h-100 card-shadow">' +
                        '<img src="./imgProductos/' + response[i].imagenProducto + '" class="card-img-top img-fluid w-75 mx-auto pt-3" alt="..." width="250px" id="' + response[i].imagenProducto + '"><div class="card-body">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title mb-3 tres_puntos">' + listadoProductos[i].nombre + '</h5>' +
                        '<p class="card-text">Precio: <span class="text-success">$ ' + listadoProductos[i].precio + '</span></p>' +
                        '<p class="card-text">Cantidad: <span class="text-primary cantidad" id="cantidad_' + i + '">' + listadoProductos[i].cantidadEnStock + '</span></p>' +
                        '<p class="card-text">' + palabra + '</span></p>' +
                        '</div>' +
                        '<div class="text-end p-1">' +
                        '<a class="btn btn-outline-danger agregar-carrito" data-tipo="' + tipo + '" data-id="' + i + '"><i class="fa-solid fa-plus"></i> Agregar carrito</a>' +
                        '</div>' +
                        '</div>'
                    //console.log(card)
                    $('#listado_productos').append(card);
                }
                
            },
            error: function (xhr, textStatus, errorThrown) {
                // Manejar errores de la solicitud AJAX aquí
                console.log("Error en la solicitud AJAX:", errorThrown);
            }
        });
    }

});

