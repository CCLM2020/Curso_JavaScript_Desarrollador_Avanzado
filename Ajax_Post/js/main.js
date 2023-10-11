$(document).ready(function() {
      
  $("#crearPost").click(function() {
    let titulo = $('#titulo').val();
    let contenido = $('#contenido').val();

    var datos = {
      title: titulo,
      body: contenido,
      userId: 1
    };

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(datos),
      success: function(data) {
        $("#resultado").html("Post creado exitosamente. Respuesta: " + JSON.stringify(data));
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error: " + textStatus, errorThrown);
      }
    });
  });
});