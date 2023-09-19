$(document).ready(function () {
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

    listadoProductos.push(new ProductoElectronico("Smart TV Hyundai 50'' 4k", 209000, 10, 100));
    listadoProductos.push(new ProductoElectronico("Smart TV Hitachi 55'' 4k", 203000, 8, 150));
    listadoProductos.push(new ProductoElectronico("Android Tv Philips Led Full Hd 43", 159999, 12, 120));
    listadoProductos.push(new ProductoAlimenticio("Leche Entera Larga Vida X 1 L", 499, 20, "2024-09-30"));
    listadoProductos.push(new ProductoAlimenticio("Ferrero Rocher Bombones", 3699, 15, "2024-10-30"));
    listadoProductos.push(new ProductoAlimenticio("Te En Saquitos La Virginia Clasico", 807, 55, "2025-11-23"));

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

        card = '<div class="col">' +
            '<div class="card h-100 card-shadow">' +
            '<img src="./imgProductos/' + i + '.png" class="card-img-top img-fluid w-75 mx-auto" alt="..." id="' + i + '.png"><div class="card-body">' +
            '<div class="card-body">' +
            '<h5 class="card-title pb-2">' + listadoProductos[i].nombre + '</h5>' +
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

    $('.agregar-carrito').on('click', function () {

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
            $('#cantidad_'+index).text(listadoProductos[index].cantidadEnStock);

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
});

