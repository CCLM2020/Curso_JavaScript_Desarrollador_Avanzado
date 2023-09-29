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

    // creando array para productos
    let listadoProductos = [];

    listadoProductos.push(new ProductoElectronico("Smart TV Hyundai 50'' 4k", 209000, 10, 100));
    listadoProductos.push(new ProductoElectronico("Smart TV Hitachi 55'' 4k", 203000, 8, 150));
    listadoProductos.push(new ProductoElectronico("Android Tv Philips Led Full Hd 43", 159999, 12, 120));
    listadoProductos.push(new ProductoAlimenticio("Leche Entera Larga Vida X 1 L", 499, 20, "2024-09-30"));
    listadoProductos.push(new ProductoAlimenticio("Ferrero Rocher Bombones", 3699, 15, "2024-10-30"));
    listadoProductos.push(new ProductoAlimenticio("Te En Saquitos La Virginia Clasico", 807, 55, "2025-11-23"));

    for (let i = 0; i < listadoProductos.length; i++) {

        let option = '<option value="' + i + '">' + listadoProductos[i].nombre + '</option>';
            
        $('#cbx-Productos').append(option);
        
    }

    $('#cbx-Productos').val(-1);

    $("#cbx-Productos").change(function () {
        if ($(this).val() != "") {
            let i = ($(this).val());
            let card = "";
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
    
            card = '<div class="col-8">' +
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
            $('#listado_productos').empty();
            $('#listado_productos').append(card);
        }
    });

    
});

