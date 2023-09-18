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
                if (this.productos[i] === producto) {
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
    }

    // nuevo carrito
    const carrito = new Carrito();

    // agregamos productos al carrito
    //carrito.agregarProducto(productoElectronico);
    //carrito.agregarProducto(productoAlimenticio);

    // Mostrarmos el total de la compra
    //console.log('Monto total en el carrito: $' + carrito.calcularTotal());

    // creando array para productos
    let listadoProductos = [];

    listadoProductos.push(new ProductoElectronico("Smart TV Hyundai 50'' 4k", 209000, 10, 100));
    listadoProductos.push(new ProductoElectronico("Smart TV Hitachi 55'' 4k", 203000, 8, 150));
    listadoProductos.push(new ProductoElectronico("Android Tv Philips Led Full Hd 43", 159999, 12, 120));
    listadoProductos.push(new ProductoAlimenticio("Leche Entera Larga Vida X 1 L", 499, 20, "2024-09-30"));
    listadoProductos.push(new ProductoAlimenticio("Ferrero Rocher Bombones", 3699, 15, "2024-10-30"));
    listadoProductos.push(new ProductoAlimenticio("Te En Saquitos La Virginia Clasico", 807, 55, "2025-11-23"));

    //console.log (listadoProductos)


    let card = "";
    for (let i = 0; i < listadoProductos.length; i++) {

        let palabra = "";
        let valor = "";
        // Comprobar si el producto es de la clase ProductoAlimenticio
        if (listadoProductos[i] instanceof ProductoAlimenticio) {
            palabra = "Fecha de caducidad: ";
            valor = listadoProductos[i].fechaCaducidad;
        } else {
            palabra = "Potencia: ";
            valor = listadoProductos[i].potencia;
        }

        card = '<div class="col" id="' + i + '">' +
            '<div class="card h-100 card-shadow">' +
            '<img src="./imgProductos/' + i + '.png" class="card-img-top img-fluid" alt="..." id="' + i + '.png"><div class="card-body">' +
            '<div class="card-body">' +
            '<h5 class="card-title pb-2">' + listadoProductos[i].nombre + '</h5>' +
            '<p class="card-text">Precio: <span class="text-success">$ ' + listadoProductos[i].precio + '</span></p>' +
            '<p class="card-text">Cantidad: <span class="text-primary cantidad">' + listadoProductos[i].cantidadEnStock + '</span></p>' +
            '<p class="card-text">' + palabra + '<span>' + valor + '</span></p>' +
            '</div>' +
            '<div class="text-end p-1">' +
            '<a class="btn btn-danger agregar-carrito"><i class="fa-solid fa-plus"></i> Agregar carrito</a>' +
            '</div>' +
            '</div>'
        //console.log(card)
        $('#listado_productos').append(card);
    }

    $('.agregar-carrito').on('click', function () {

        // Obtenemos el id de la columna clase col mas cercana del boton donde hice clic
        let col_Id = $(this).closest('.col').attr('id');

        //console.log[listadoProductos[col_Id].nombre];

        if (listadoProductos[col_Id].cantidadEnStock > 0) {
            //console.log[listadoProductos[col_Id]];


            // Comprobar si el producto es de la clase ProductoAlimenticio
            if (listadoProductos[col_Id] instanceof ProductoAlimenticio) {
                //console.log("El producto es un producto alimenticio");
                let p2 = new ProductoAlimenticio(listadoProductos[col_Id].nombre, listadoProductos[col_Id].precio, 1, listadoProductos[col_Id].fechaCaducidad);
                carrito.agregarProducto(p2);
            } else {
                //console.log("El producto no es un producto alimenticio");
                let p1 = new ProductoElectronico(listadoProductos[col_Id].nombre, listadoProductos[col_Id].precio, 1, listadoProductos[col_Id].potencia);
                carrito.agregarProducto(p1);
            }

            listadoProductos[col_Id].cantidadEnStock = (listadoProductos[col_Id].cantidadEnStock - 1);
            $(this).closest('.col').find('.cantidad').text(listadoProductos[col_Id].cantidadEnStock);

            if (listadoProductos[col_Id].cantidadEnStock == 0) {
                $(this).closest('.agregar-carrito').addClass('disabled');
            }


        }
        //console.log('ID de la columna: ' + listadoProductos[col_Id].nombre);

        $('#cantidad_carrito').html(carrito.calcularCantidad());
        $('#total_carrito').html(carrito.calcularTotal());

        console.log(carrito);

    });

});

