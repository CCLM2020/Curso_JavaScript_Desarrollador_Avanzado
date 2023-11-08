const productos = require('../models/producto_models');

module.exports = {

    listado_Productos: async (req, res) => {
        try {
            const listaProductos = await productos.find().sort({ nombreProducto: 1 }); // 1 para orden ascendente, -1 para descendente;
            res.json(listaProductos)
        } catch (error) {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    agregar_Productos: async (req, res) => {

        const fs = require('fs');
        const formData = req.fields;

        const imgRecortadaProducto = formData.imgRecortadaProducto; // Imagen que se envía como base64 en el cuerpo de la solicitud

        // Divide la cadena para obtener el tipo y los datos de la imagen
        const imageData = imgRecortadaProducto.split(';base64,');
        const imageType = imageData[0].split(':')[1];
        const base64Data = imageData[1];

        // Decodifica los datos base64 en un búfer binario
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // Guarda la imagen en un archivo
        const imageFileName = `${Date.now()}.jpeg`;
        const imageDirectory = '../www/imgProductos/'; // Ruta al directorio donde deseas guardar la imagen
        const imagePath = `${imageDirectory}${imageFileName}`;

        fs.writeFile(imagePath, imageBuffer, (err) => {
            if (err) {

                res.status(500).json({ estado: 0, mensaje: 'Error al guardar la imagen. Intente nuevamente.' });
                return;

            } else {

                // Crear una nueva instancia de Usuario
                const nuevoProducto = new productos({
                    nombreProducto: formData.txt_nombreProducto,
                    imagenProducto: imageFileName,
                    precioProducto: formData.txt_Precio,
                    cantidadProducto: formData.txt_Stock,
                    potenciaProducto: formData.txt_Potencia
                });

                // Guardar el nuevo usuario en la base de datos
                nuevoProducto.save()
                    .then((usuarioGuardado) => {
                        res.status(200).json({ estado: 1, mensaje: 'Producto guardado con éxito!' });
                    })
                    .catch((error) => {
                        res.status(500).json({ estado: 0, mensaje: 'Error al guardar el Producto. Intente nuevamente.' });
                    });

            }
        });

    },


    modificar_Productos: async (req, res) => {

        const fs = require('fs');
        const formData = req.fields;

        const imgRecortadaProducto = formData.imgRecortadaProducto; // Imagen que se envía como base64 en el cuerpo de la solicitud

        //guardo el nombre de la imagen anterior... si hay una imagen nueva lo reemplazo mas adelante
        let img_Producto = formData.txt_ImgOcultoProducto;

        if (imgRecortadaProducto) { //Si modifique la imagen

            // Divide la cadena para obtener el tipo y los datos de la imagen
            const imageData = imgRecortadaProducto.split(';base64,');
            const imageType = imageData[0].split(':')[1];
            const base64Data = imageData[1];

            // Decodifica los datos base64 en un búfer binario
            const imageBuffer = Buffer.from(base64Data, 'base64');

            // Guarda la imagen en un archivo
            const imageFileName = `${Date.now()}.jpeg`;
            const imageDirectory = '../www/imgProductos/'; // Ruta al directorio donde deseas guardar la imagen
            const imagePath = `${imageDirectory}${imageFileName}`;

            // Usa Promesa para garantizar que la imagen se haya guardado antes de continuar
            try {
                console.log('Guardando la imagen...');
                await fs.promises.writeFile(imagePath, imageBuffer); // Usamos fs.promises para devolver una Promesa en lugar de un callback
                //console.log('Imagen guardada con éxito');

                // Actualiza el nombre de la imagen después de que se haya guardado
                img_Producto = imageFileName;

                // Elimina la imagen anterior
                const imagenAnterior = formData.txt_ImgOcultoProducto;
                if (imagenAnterior) {
                    //console.log('Eliminando la imagen anterior...');
                    const rutaImagenAnterior = `${imageDirectory}${imagenAnterior}`;
                    await fs.promises.unlink(rutaImagenAnterior); // Usamos fs.promises para devolver una Promesa en lugar de un callback
                    //console.log('Imagen anterior eliminada con éxito');
                }
            } catch (err) {
                //console.error('Error al guardar o eliminar imágenes:', err);
                res.status(500).json({ estado: 0, mensaje: 'Error al guardar la imagen. Intente nuevamente.' });
                return;
            }
        }

        const productoId = formData.txt_id_Producto;

        try {
            const productoActualizado = await productos.findByIdAndUpdate(
                productoId,
                {
                    nombreProducto: formData.txt_nombreProducto,
                    imagenProducto: img_Producto,
                    precioProducto: formData.txt_Precio,
                    cantidadProducto: formData.txt_Stock,
                    potenciaProducto: formData.txt_Potencia
                },
                { new: true }
            );
            res.status(200).json({ estado: 1, mensaje: 'El producto modificado con éxito!' });
        } catch (error) {
            res.status(500).json({ estado: 0, mensaje: 'Error al modificar el producto. Intente nuevamente.' });
        }
    },


    eliminar_Productos: async (req, res) => {
        const data = req.body;
        const fs = require('fs');

        const productoBuscado = await productos.findByIdAndDelete(data.id_Producto);

        if (productoBuscado) {
            if (data.id_Producto  && data.img_Producto) {

                const imageDirectory = '../www/imgProductos/'; // Ruta al directorio donde deseas guardar la imagen
                const imagenAeliminar = data.img_Producto;

                const rutaImagenAeliminar = `${imageDirectory}${imagenAeliminar}`;

                try {
                    await fs.promises.unlink(rutaImagenAeliminar); // Usa 'await' para esperar a que se complete la eliminación
                    res.status(200).json({ estado: 1, mensaje: `<p>El producto fue eliminado.</p>` });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ estado: 0, mensaje: `<p>Error al eliminar la imagen del producto.</p>` });
                }
            } else {
                res.status(200).json({ estado: 0, mensaje: `<p>El producto no fue encontrado.</p>` })
            }
        } else {
            res.status(200).json({ estado: 0, mensaje: `<p>El producto no fue encontrado.</p>` })
        }
    },

};
