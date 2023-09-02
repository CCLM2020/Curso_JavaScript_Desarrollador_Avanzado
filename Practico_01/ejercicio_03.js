let producto = {
    nombre: "iPhone 14 Pro Max",
    precio: 1200,
    disponible: true,
};
  
function mostrarProducto(producto) {
    console.log("Nombre:", producto.nombre);
    console.log("Precio:", producto.precio);
    console.log("Disponible:", producto.disponible);
}
  
mostrarProducto(producto);