$(document).ready(function() {
    window.onscroll = function() {
        disableNavbar()
    };

    const disableNavbar = () => {
        if ((document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) && ($(window).width() >= 1200)) {
            $("#sectionsNav").css("display", "none");
            // $("#sectionsNav").addClass("newNavBar");
        } else {
            $("#sectionsNav").css("display", "inline");
            // $("#sectionsNav").removeClass("newNavBar");
        }
    }

    if ((document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) && ($(window).width() >= 1200)) {
        $("#sectionsNav").css("display", "none");
    }
});

$(document).ready(function() {
    //pega o id da vitima
    var url_atual = window.location.href;
    url_atual = url_atual.split('id=')[1];

    //atualiza a vitima
    $('#btnEnviarComentario').click(function() {
        if ($("#nome").val() != '' && $("#email").val() != '' && $("#comentario").val() != '' && url_atual != '') {
            var comentario = {};
            comentario.id = url_atual;
            comentario.nome = $("#nome").val();
            if($("#sobrenome").val()){
                comentario.nome = comentario.nome + " " + $("#sobrenome").val();
            }
            comentario.email = $("#email").val();
            comentario.comentario = $("#comentario").val();
            comentario = JSON.stringify(comentario);
            $.ajax({
                url: "/fazerComentario",
                method: "POST",
                data: {
                    comentario: comentario
                },
                success: function(data) {
                    $('#modalMensagem').modal('show');
                }
            });
        } else {
            console.log('eh NULL')
        }
    });

    $('#modalMensagem').on('hidden.bs.modal', function() {
        location.reload();
    })
});