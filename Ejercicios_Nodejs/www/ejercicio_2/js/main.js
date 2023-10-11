$(document).ready(function () {

    let libros = [];

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/libros",
        dataType: "json",
        success: function (data) {

            libros = data;

            $.each(libros, function (index, libro) {

                let a = `<a href="#" class="list-group-item list-group-item-action list-group-item-primary" id="${libro.id}">${libro.título}</a>`;

                $('#lst_Libros').append(a);
            });

        }
    });

    $(document).on('click', 'a', function () {

        let id_Libro = $(this).attr('id');

        let libro = libros.find(p => p.id == id_Libro);

        if (libro) {
            $("#lst_InfoLibro").removeClass("d-none");
            $("#li_Titulo").text(`Título: ${libro.título}`);
            $("#li_Id").text(`Id: ${libro.id}`);
            $("#li_Autor").text(`Autor: ${libro.autor}`);
            $("#li_Anio").text(`Año: ${libro.año}`);
        }
    });

}); //fin document ready