//objetos
/*
const MediosComunicacion = {
    saludar: function () {
        console.log("¡Hola desde MediosComunicacion!");
    }
};


const radio1 = Object.create(MediosComunicacion);

const radio2 = Object.create(MediosComunicacion);

console.log('Este es radio1: ');
radio1.saludar();

console.log('Este es radio2: ');
radio1.saludar();
*/


//clases
/*
Necesito almacenar información de Clientes, los mismos pueden ser : consumidores finales, responsables inscriptos, pyme
Necesito almacenar la información de ellos : nombre, dirección, mail, telefono
Pero en el caso de consumidor final guardar:
Apellido, DNI
En el caso de responsable inscripto: CUIT, ingresos brutos, numero de punto de venta
Si es el caso de una pyme almacenar : nombre de fantasía, CUIT
Debo poder mostrar el saldo deudor de cualquiera de mis clientes
Si es responsable quiero ver el cuit
Si es consumidor final quiero ver el dni
Y si es pyme quiero ver el nombre de fantasua
*/

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

// creando objetos de producto
const productoElectronico = new ProductoElectronico("Televisión", 1000, 10, 100);
const productoAlimenticio = new ProductoAlimenticio("Leche", 450, 20, "2023-09-30");

// Mostrar informacion de los productos
productoElectronico.mostrarInformacion();
console.log('\n')
productoAlimenticio.mostrarInformacion();
console.log('\n')

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
}

// nuevo carrito
const carrito = new Carrito();

// agregamos productos al carrito
carrito.agregarProducto(productoElectronico);
carrito.agregarProducto(productoAlimenticio);

// Mostrarmos el total de la compra
console.log('Monto total en el carrito: $' + carrito.calcularTotal());
console.log(carrito);
