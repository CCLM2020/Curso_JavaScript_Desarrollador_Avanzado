const usuarios = require('../models/usuario_models');

module.exports = {
    listado_Usuarios: async (req, res) => {
        try {
            const listaUsuarios = await usuarios.find().select('_id nombreUsuario imagenUsuario').sort({ nombreUsuario: 1 }); // 1 para orden ascendente, -1 para descendente;
            res.json(listaUsuarios)
        } catch (error) {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    validar_Usuarios: async (req, res) => {
        const data = req.body;
        const usuarioBuscado = await usuarios.findOne({ nombreUsuario: data.id_txtUsuario });
        if (usuarioBuscado) {
            if (data.id_txtContrasenia === usuarioBuscado.claveUsuario) {
                res.status(200).json({ estado: 1, ruta: '../unlock/index.html', id_usuario: usuarioBuscado._id, imagen: usuarioBuscado.imagenUsuario })
            } else {
                res.status(200).json({ estado: 0, mensaje: `<p>El usuario <strong>${data.id_txtUsuario}</strong> no fue encontrado o la contraseña es incorrecta.</p>` })
            }
        } else {
            res.status(200).json({ estado: 0, mensaje: `<p>El usuario <strong>${data.id_txtUsuario}</strong> no fue encontrado o la contraseña es incorrecta.</p>` })
        }
    },

    agregar_Usuarios: async (req, res) => {

        const fs = require('fs');
        const formData = req.fields;

        const imgRecortada = formData.imgRecortada; // Imagen que se envía como base64 en el cuerpo de la solicitud

        // Divide la cadena para obtener el tipo y los datos de la imagen
        const imageData = imgRecortada.split(';base64,');
        const imageType = imageData[0].split(':')[1];
        const base64Data = imageData[1];

        // Decodifica los datos base64 en un búfer binario
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // Guarda la imagen en un archivo
        const imageFileName = `${Date.now()}.jpeg`;
        const imageDirectory = '../www/imgUsuarios/'; // Ruta al directorio donde deseas guardar la imagen
        const imagePath = `${imageDirectory}${imageFileName}`;

        fs.writeFile(imagePath, imageBuffer, (err) => {
            if (err) {

                res.status(500).json({ estado: 0, mensaje: 'Error al guardar la imagen. Intente nuevamente.' });
                return;

            } else {

                // Crear una nueva instancia de Usuario
                const nuevoUsuario = new usuarios({
                    nombreUsuario: formData.txt_nombreUsuario,
                    claveUsuario: formData.txt_Pass_A,
                    imagenUsuario: imageFileName
                });

                // Guardar el nuevo usuario en la base de datos
                nuevoUsuario.save()
                    .then((usuarioGuardado) => {
                        res.status(200).json({ estado: 1, mensaje: 'Usuario guardado con éxito!' });
                    })
                    .catch((error) => {
                        res.status(500).json({ estado: 0, mensaje: 'Error al guardar el usuario. Intente nuevamente.' });
                    });

            }
        });

    },

    modificar_Usuarios: async (req, res) => {

        const fs = require('fs');
        const formData = req.fields;

        const imgRecortada = formData.imgRecortada; // Imagen que se envía como base64 en el cuerpo de la solicitud

        //guardo el nombre de la imagen anterior... si hay una imagen nueva lo reemplazo mas adelante
        let img_Usuario = formData.txt_nomImgOculto;

        if (imgRecortada) { //Si modifique la imagen

            // Divide la cadena para obtener el tipo y los datos de la imagen
            const imageData = imgRecortada.split(';base64,');
            const imageType = imageData[0].split(':')[1];
            const base64Data = imageData[1];

            // Decodifica los datos base64 en un búfer binario
            const imageBuffer = Buffer.from(base64Data, 'base64');

            // Guarda la imagen en un archivo
            const imageFileName = `${Date.now()}.jpeg`;
            const imageDirectory = '../www/imgUsuarios/'; // Ruta al directorio donde deseas guardar la imagen
            const imagePath = `${imageDirectory}${imageFileName}`;

            // Usa Promesa para garantizar que la imagen se haya guardado antes de continuar
            try {
                console.log('Guardando la imagen...');
                await fs.promises.writeFile(imagePath, imageBuffer); // Usamos fs.promises para devolver una Promesa en lugar de un callback
                //console.log('Imagen guardada con éxito');

                // Actualiza el nombre de la imagen después de que se haya guardado
                img_Usuario = imageFileName;
    
                // Elimina la imagen anterior
                const imagenAnterior = formData.txt_nomImgOculto;
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

        const userId = formData.txt_id_Usuario;

        if (formData.pass_A_B == 1) {//si modifique la contraseña

            try {
                const usuarioActualizado = await usuarios.findByIdAndUpdate(
                    userId,
                    {
                        nombreUsuario: formData.txt_nombreUsuario,
                        claveUsuario: formData.txt_Pass_A,
                        imagenUsuario: img_Usuario
                    },
                    { new: true }
                );
                res.status(200).json({ estado: 1, mensaje: 'Usuario modificado con éxito!', usuario: usuarioActualizado.nombreUsuario, imagen: usuarioActualizado.imagenUsuario, id_usuario: usuarioActualizado._id });
            } catch (error) {
                res.status(500).json({ estado: 0, mensaje: 'Error al modificar el usuario. Intente nuevamente.' });
            }
        } else { //sino modifique la contraseña
            try {
                const usuarioActualizado = await usuarios.findByIdAndUpdate(
                    userId,
                    {
                        nombreUsuario: formData.txt_nombreUsuario,
                        imagenUsuario: img_Usuario
                    },
                    { new: true }
                );
                res.status(200).json({ estado: 1, mensaje: 'Usuario modificado con éxito!', usuario: usuarioActualizado.nombreUsuario, imagen: usuarioActualizado.imagenUsuario, id_usuario: usuarioActualizado._id });
            } catch (error) {
                res.status(500).json({ estado: 0, mensaje: 'Error al modificar el usuario. Intente nuevamente.' });
            }

        }

    },

    eliminar_Usuarios: async (req, res) => { // ({ nombreUsuario: data.id_txtUsuario });
        const data = req.body;
        const fs = require('fs');

        const usuarioBuscado = await usuarios.findByIdAndDelete(data.id_Usuario);

        if (usuarioBuscado) {
            if (data.id_Usuario  && data.img_Usuario) {

                const imageDirectory = '../www/imgUsuarios/'; // Ruta al directorio donde deseas guardar la imagen
                const imagenAeliminar = data.img_Usuario;

                const rutaImagenAeliminar = `${imageDirectory}${imagenAeliminar}`;

                //fs.promises.unlink(rutaImagenAeliminar); // Usamos fs.promises para devolver una Promesa en lugar de un callback

                //res.status(200).json({ estado: 1, mensaje: `<p>El usuario fue eliminado.</p>` })

                try {
                    await fs.promises.unlink(rutaImagenAeliminar); // Usa 'await' para esperar a que se complete la eliminación
                    res.status(200).json({ estado: 1, mensaje: `<p>El usuario fue eliminado.</p>` });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ estado: 0, mensaje: `<p>Error al eliminar la imagen del usuario.</p>` });
                }
            } else {
                res.status(200).json({ estado: 0, mensaje: `<p>El usuario no fue encontrado.</p>` })
            }
        } else {
            res.status(200).json({ estado: 0, mensaje: `<p>El usuario no fue encontrado.</p>` })
        }
    },

};
