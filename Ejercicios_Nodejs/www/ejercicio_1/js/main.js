$(document).ready(function () {

    let usuarios = [];

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/usuarios",
        dataType: "json",
        success: function (data) {

            usuarios = data;

            $.each(usuarios, function (index, usuario) {
                
                let option = `<option value="${usuario.id}">${usuario.nombre}</option>`;

                $('#cbx-Usuarios').append(option);
            });

            $('#cbx-Usuarios').val(0);
        }
    });

    $("#cbx-Usuarios").change(function () {
        $("#cbx-Usuarios option:selected").each(function () {

            let id_Usuario = $('#cbx-Usuarios').val();

            let usuario = usuarios.find(p => p.id == id_Usuario);

            if (usuario) {
                let item = `Id: ${usuario.id} ___ Código: ${usuario.codigo} ___ Nombre: ${usuario.nombre}`;
                $('#lbl-InfoUsuarios').text(item);
            }

        })
    });
}); //fin document ready

