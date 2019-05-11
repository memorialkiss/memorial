const disableNavbar = () => {
    if ($(window).width() < 768) {
        $("#principal").removeClass("main-raised");
        $("#principal").css("overflow-x", "hidden");
    } else {
        $("#principal").addClass("main-raised");
    }
}
disableNavbar();
window.addEventListener("resize", disableNavbar);




$(document).ready(function () {
    //atualiza a vitima
    $('#btnEnviarEmail').click(function() {
        if ($("#nome").val() != '' && $("#email").val() != '' && $("#mensagem").val() != '' && ($("#naorobo").is(":checked")==true)) {
            var textoCarregando = '&nbsp&nbsp<i class="fa fa-spinner fa-spin"></i>&nbsp&nbsp&nbsp&nbspenviando&nbsp&nbsp&nbsp&nbsp&nbsp';
            var btn = $("#btnEnviarEmail").html(textoCarregando);

            var mensagem = {};
            
            mensagem.nome = $("#nome").val();
            if($("#sobrenome").val()){
                mensagem.nome = mensagem.nome + " " + $("#sobrenome").val();
            }

            mensagem.email = $("#email").val();
            mensagem.mensagem = $("#mensagem").val();
            mensagem = JSON.stringify(mensagem);

            $.ajax({
                url: "/enviarEmail",
                method: "POST",
                data: {
                    mensagem: mensagem
                },
                success: function(data) {
                    textoCarregando = "ENVIAR MENSAGEM";
                    var btn = $("#btnEnviarEmail").html(textoCarregando);
                    
                    if(data == '1'){
                        $("#modalTitulo").html("Mensagem enviando com sucesso!");
                        $("#modalComentario").html("Em breve responderemos");
                        $('#modalMensagem').modal('show');
                    } else {
                        $("#modalTitulo").html("Falha ao enviar o e-mail!");
                        $("#modalComentario").html("Tente mais tarde");
                        $('#modalMensagem').modal('show');
                    }

                    $('#modalMensagem').on('hidden.bs.modal', function() {
                        location.reload();
                    })
                }
            });
        } else {
            var tam = $("#mensagem").val().length;

            if($("#nome").val() == ''){
                $('#modalTitulo').html('Você deve preencher o nome!');
                $('#modalComentario').html('');
                $('#modalMensagem').modal('show');
                return false;
            } else if($("#email").val() == ''){
                $('#modalTitulo').html('Você deve preencher o email!');
                $('#modalComentario').html('');
                $('#modalMensagem').modal('show');
                return false;
            } else if($("#mensagem").val() == '' || tam < 30){
                $('#modalTitulo').html('Você deve escrever uma mensagem com no mínimo 30 caracteres...');
                if(tam > 1){
                    $('#modalComentario').html("Sua mensagem tem "+ tam + " caracteres");
                }
                $('#modalMensagem').modal('show');
                return false;
            } else if($("#naorobo").is(":checked")==false){
                $('#modalTitulo').html('Você deve confirmar que não é um robô!');
                $('#modalComentario').html('');
                $('#modalMensagem').modal('show');
                return false;
            }
        }
    });
});