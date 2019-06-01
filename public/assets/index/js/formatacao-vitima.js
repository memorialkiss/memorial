// $(document).ready(function() {
//     window.onscroll = function() {
//         disableNavbar()
//     };

//     const disableNavbar = () => {
//         if ((document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) && ($(window).width() >= 1200)) {
//             $("#sectionsNav").css("display", "none");
//             // $("#sectionsNav").addClass("newNavBar");
//         } else {
//             $("#sectionsNav").css("display", "inline");
//             // $("#sectionsNav").removeClass("newNavBar");
//         }
//     }

//     if ((document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) && ($(window).width() >= 1200)) {
//         $("#sectionsNav").css("display", "none");
//     }
// });

//enviar recordacao
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

$(document).ready(function() {
    var quantidadePorPagina = 15;
    var paginaAtual = 1;
    var id = window.location.href.split('id=')[1];

    //se nao for mobile
    if ($(window).width() >= 768) {
        var quantidadePorPagina = 15;
        var colunas = `
        <th class="colunaTabela"></th>
        <th class="colunaTabelaSimbolo"></th>
        <th class="colunaTabela"></th>
        <th class="colunaTabelaSimbolo"></th>
        <th class="colunaTabela"></th>
        <th class="colunaTabelaSimbolo"></th>`;
        $("#colunasRecordacoes").html(colunas);
    } else { //se for mobile
        var quantidadePorPagina = 6;
        var colunas = `
        <th class="colunaTabela"></th>
        <th class="colunaTabelaSimbolo"></th>`;
        $("#colunasRecordacoes").html(colunas);
    }

    listarComentario(paginaAtual, quantidadePorPagina, id); //Chamar a função para listar as recordacoes
});

function listarComentario(paginaAtual, quantidadePorPagina, id) {
    var dados = {
        paginaAtual: paginaAtual,
        quantidadePorPagina: quantidadePorPagina,
        id: id
    }
    $.post('/listarComentarios', dados, function(retorno) {
        var obj = JSON.parse(retorno);
        var coluna = 0;
        var textoHtml = '';
        var contRecordacoes = $("#painelRecordacoes").attr("quantidade"); //devolve a quantidade de recordacoes
        var contDePagina = 0;

        obj.forEach(function (recordacao, index){
            if ($(window).width() >= 768) {
                if(coluna == 0){
                    textoHtml += "<tr>\n";
                }
            } else {
                textoHtml += "<tr>\n";
            }

            textoHtml += `  <td>${recordacao.autor}</td>
            <td style="text-align: right">
                <span autor="${recordacao.autor}" dataRecordacao="${recordacao.data}" comentario="${recordacao.comentario}" onclick="modalRecordacao(this)" style="cursor: pointer;">
                    <i class="fas fa-star iconeComentario"></i>
                </span>
            </td>\n`;

            if ($(window).width() >= 768) {
                coluna += 1;
                if(coluna == 3){
                    coluna = 0;
                    textoHtml += "</tr>\n";
                }
            } else {
                textoHtml += "</tr>\n";
            }
        });
        $("#recordacoes").html(textoHtml);

        var quantidadeDePaginas = Math.ceil(contRecordacoes/quantidadePorPagina);
        //paginacao
        if(quantidadeDePaginas > 1){
            var maxLinksPaginas = 2;
            var textoHtml2 = '';
            //pagina anterior
            if(paginaAtual == 1){
                textoHtml2 += `<li class="page-item disabled"><span class="page-link">Anterior</span></li>\n`;
            } else {
                textoHtml2 += `<li class="page-item"><span class="page-link" onclick='listarComentario(${paginaAtual - 1}, ${quantidadePorPagina}, ${dados.id})'>Anterior</span></li>\n`;
            }
            //antes da pagina atual
            for(let pgAnteriores = paginaAtual - maxLinksPaginas; pgAnteriores <= paginaAtual - 1; pgAnteriores++){
                if(pgAnteriores >= 1){
                    textoHtml2 += `<li class="page-item"><span class="page-link" onclick='listarComentario(${pgAnteriores}, ${quantidadePorPagina}, ${dados.id})'>${pgAnteriores}</span></li>\n`;
                }
            }
            //pagina atual
            textoHtml2 += `<li class="page-item"><span class="page-link linkPgAtivada">${paginaAtual}</a></li>\n`;
            //depois da pagina atual
            for(let pgPosteriores = paginaAtual + 1; pgPosteriores <= paginaAtual + maxLinksPaginas; pgPosteriores++){
                if(pgPosteriores <= quantidadeDePaginas){
                    textoHtml2 += `<li class="page-item"><span class="page-link" onclick='listarComentario(${pgPosteriores}, ${quantidadePorPagina}, ${dados.id})'>${pgPosteriores}</span></li>\n`;
                }
            }
            //proxima pagina
            if(paginaAtual < quantidadeDePaginas){
                textoHtml2 += `<li class="page-item"><span class="page-link" onclick='listarComentario(${paginaAtual + 1}, ${quantidadePorPagina}, ${dados.id})'>Próximo</span></li>\n`;
            } else {
                textoHtml2 += `<li class="page-item disabled"><span class="page-link">Próximo</span></li>\n`;
            }
            $("#paginasRecordacoes").html(textoHtml2);
        }
    });
}

function modalRecordacao(componente){
    var autor = componente.getAttribute("autor");
    var dataHora = componente.getAttribute("dataRecordacao");
    var comentario = componente.getAttribute("comentario");

    data = dataHora.split("-");
    ano = data[0];
    mes = data[1];
    dia = data[2].split(" ")[0];
    hora = data[2].split(" ")[1].substring(0,5);
    data = "Em " + dia + "-" + mes + "-" + ano + " às " + hora; 

    $("#recordacaoTitulo").html(autor);
    $("#recordacaoData").html(data);
    $("#recordacaoTexto").html(comentario);
    $('#recordacaoModal').modal('show');
}