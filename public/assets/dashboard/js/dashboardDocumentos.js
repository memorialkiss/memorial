$(document).ready(function () {
    var quantidadePorPagina = 10;
    var paginaAtual = 1;
    listarDocumentos(paginaAtual, quantidadePorPagina); //Chamar a função para listar as recordacoes
});

$(document).ready(function () {
    $('#documentoBtnAdicionar').click(function () {
        // let titulo = 
        let titulo = $("#documentoTitulo").val();
        let periodico = $("#documentoPeriodico").val();
        let data = $("#documentoData").val();
        let descricao = CKEDITOR.instances.documentoDescricao.getData();
        let checkDesdobramento = $("#documentoCheckDescobramento").is(':checked');
        let checkVitima = $("#documentoCheckVitima").is(':checked');
        let idVitima = $("#documentoIdVitima").val();
        let pagina = $("#documentoPagina").val();

        //verificacoes dos campos
        if (!titulo) {
            $('#textoModalSemReload').html('Você deve colocar um título na publicação');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if (!periodico) {
            $('#textoModalSemReload').html('Você deve colocar o nome do periódico');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if (!data) {
            $('#textoModalSemReload').html('Você deve colocar a data da publicação');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if (!descricao) {
            $('#textoModalSemReload').html('Você deve transcrever a matéria');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if (!checkDesdobramento && !checkVitima) {
            $('#textoModalSemReload').html('Você deve selecionar o assunto da publicação');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if (checkVitima && !idVitima) {
            $('#textoModalSemReload').html('Você deve selecionar a vítima');
            $('#modalMensagemSemReload').modal('show');
            return;
        }

        //atribuicoes padrao
        if (!pagina) pagina = null;
        if (!idVitima) idVitima = null;
        if (!checkDesdobramento) checkDesdobramento = 0;
        if (!checkVitima) checkVitima = 0;

        //enviar documento
        var documento = {};
        documento.titulo = titulo;
        documento.periodico = periodico;
        documento.data = data;
        documento.numPagina = pagina;
        documento.descricao = descricao;
        documento.flagDesdobramento = checkDesdobramento;
        documento.flagVitima = checkVitima;
        documento.fk_idVitima = idVitima;
        documento = JSON.stringify(documento);
        $.ajax({
            url: "/adicionarDocumento",
            method: "POST",
            data: {
                documento: documento
            },
            success: function (data) {
                $('#textoModal').html("Documento cadastrado com sucesso");
                $('#modalMensagem').modal('show');
            }
        });
    });

    $("#documentoCheckVitima").click(function () {
        if ($("#documentoCheckVitima").is(':checked')) {
            $("#divSelecionarVitima").css('display', 'inline');
        } else {
            $("#divSelecionarVitima").css('display', 'none');
        }
    });

    $('#eventoBtnAdicionar').click(function () {
        // let titulo = 
        let titulo = $("#eventoTitulo").val();
        let periodico = $("#eventoPeriodico").val();
        let data = $("#eventoData").val();
        let checkDesdobramento = $("#eventoCheckDescobramento").is(':checked');
        let checkVitima = $("#eventoCheckVitima").is(':checked');

        //verificacoes dos campos
        if (!titulo) {
            $('#textoModalSemReload').html('Você deve colocar um título na publicação');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if (!periodico) {
            $('#textoModalSemReload').html('Você deve colocar o nome do periódico');
            $('#modalMensagemSemReload').modal('show');
            return;
        }

        //atribuicoes padrao
        if (!data) data = null;
        if (!checkDesdobramento) checkDesdobramento = 0;
        if (!checkVitima) checkVitima = 0;

        //enviar documento
        let evento = {};
        evento.titulo = titulo;
        evento.periodico = periodico;
        evento.data = data;
        evento.flagDesdobramento = checkDesdobramento;
        evento.flagVitima = checkVitima;
        evento = JSON.stringify(evento);
        $.ajax({
            url: "/adicionarDocEvento",
            method: "POST",
            data: {
                evento: evento
            },
            success: function (data) {
                $('#textoModal').html("Evento cadastrado com sucesso");
                $('#modalMensagem').modal('show');
            }
        });
    });

    $('#documentoEvento').change(function () {
        let obj = {};
        obj.titulo = $('option:selected', this).attr('titulo');
        obj.periodico = $('option:selected', this).attr('periodico');
        obj.data = $('option:selected', this).attr('data');
        obj.fdesdo = $('option:selected', this).attr('fdesdobramento');
        obj.fvitima = $('option:selected', this).attr('fvitima');
        
        $("#documentoTitulo").val(obj.titulo);
        $("#documentoPeriodico").val(obj.periodico);
        $("#documentoData").val(obj.data);

        if(obj.fdesdo=='1'){
            $("#documentoCheckDescobramento").prop("checked", true);
        } else { 
            $("#documentoCheckDescobramento").prop("checked", false);
        }

        if(obj.fvitima=='1'){
            $("#documentoCheckVitima").prop("checked", true);
            $("#divSelecionarVitima").css('display', 'inline');
        } else {
            $("#divSelecionarVitima").css('display', 'none');
            $("#documentoCheckVitima").prop("checked", false);
        }
    });
});

function listarDocumentos(paginaAtual, quantidadePorPagina) {
    var dados = {
        paginaAtual: paginaAtual,
        quantidadePorPagina: quantidadePorPagina,
    }

    $.post('/listarDocumentos', dados, function (retorno) {
        var obj = JSON.parse(retorno);
        var textoHtml = '';
        var contRecordacoes = $("#documentosNavPaginacao").attr("quantidade"); //devolve a quantidade de documentos

        obj.forEach(function (documento) {
            documento['numPagina'] = documento['numPagina'] != '' ? documento['numPagina'] : 'Não especificado';
            documento['flagDesdobramento'] = documento['flagDesdobramento'] == 1 ? 'checked' : '';
            documento['flagVitima'] = documento['flagVitima'] == 1 ? 'checked' : '';

            textoHtml +=
                `  
                <div class="row" style="padding-bottom: 10px">
                    <div class="col-md-10 ml-auto mr-auto">
                        <div class="card card-user">
                            <div class="card-header">

                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>Título da publicação</label>
                                        <div type="text" class="form-control">
                                            ${documento['titulo']}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 espacamentoCampo">
                                        <label>Periódico</label>
                                        <div type="text" class="form-control">
                                            ${documento['periodico']}
                                        </div>
                                    </div>
                                    <div class="col-md-3 espacamentoCampo">
                                        <label>Data da publicação</label>
                                        <div type="text" class="form-control">
                                            ${documento['data']}
                                        </div>
                                    </div>
                                    <div class="col-md-3 espacamentoCampo">
                                        <label>Página</label>
                                        <div type="text" class="form-control">
                                            ${documento['numPagina']}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 espacamentoCampo">
                                        <label>Assunto da publicação</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4" style="padding-top: 5px">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input id="documentoCheckDescobramento" class="form-check-input" type="checkbox" ${documento['flagDesdobramento']} disabled>
                                                Incêndio e desdobramentos
                                                <span class="form-check-sign">
                                                    <span class="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-2" style="padding-top: 5px">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input id="documentoCheckVitima" class="form-check-input" type="checkbox" ${documento['flagVitima']} disabled>
                                                Vítima
                                                <span class="form-check-sign">
                                                    <span class="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <?php if ($documento['nomeVitima'] != '') { ?>
                                        <div class="col-md-6 exibeVitima">
                                            <label>Nome da Vítima</label>
                                            <div type="text" class="form-control">
                                                ${documento['nomeVitima']}
                                            </div>
                                        </div>
                                    <?php } ?>
                                </div>
                                <div class="row" style="padding-bottom: 30px;">
                                    <div class="col-md-12 espacamentoCampo">
                                        <label>Transcrição da Matéria</label>
                                        <div type="text" class="form-control" style="cursor:auto;" disabled>
                                            <div style="padding: 8px 3px">
                                                ${documento['descricao']}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            `;
            $('html,body').animate({ scrollTop: $("#paginacao2") }, 1000, 'swing');
        });
        $("#documentosPaineis").html(textoHtml);

        var quantidadeDePaginas = Math.ceil(contRecordacoes / quantidadePorPagina);

        //paginacao
        if (quantidadeDePaginas > 1) {
            var maxLinksPaginas;
            var textoHtml2 = '';

            maxLinksPaginas = (paginaAtual == 1 || paginaAtual == quantidadeDePaginas) ? 2 : 1;

            //pagina anterior
            if (paginaAtual == 1) {
                textoHtml2 += `<li class="page-item disabled"><a class="page-link">Primeira</a></li>\n`;
            } else {
                textoHtml2 += `<li class="page-item"><a class="page-link" onclick='listarDocumentos(1, ${quantidadePorPagina})'>Primeira</a></li>\n`;
            }
            //antes da pagina atual
            for (let pgAnteriores = paginaAtual - maxLinksPaginas; pgAnteriores <= paginaAtual - 1; pgAnteriores++) {
                if (pgAnteriores >= 1) {
                    textoHtml2 += `<li class="page-item"><a class="page-link" onclick='listarDocumentos(${pgAnteriores}, ${quantidadePorPagina})'>${pgAnteriores}</a></li>\n`;
                }
            }
            //pagina atual
            textoHtml2 += `<li class="page-item active"><a class="page-link">${paginaAtual}</a></li>\n`;
            //depois da pagina atual
            for (let pgPosteriores = paginaAtual + 1; pgPosteriores <= paginaAtual + maxLinksPaginas; pgPosteriores++) {
                if (pgPosteriores <= quantidadeDePaginas) {
                    textoHtml2 += `<li class="page-item"><a class="page-link" onclick='listarDocumentos(${pgPosteriores}, ${quantidadePorPagina})'>${pgPosteriores}</a></li>\n`;
                }
            }
            //proxima pagina
            if (paginaAtual < quantidadeDePaginas) {
                // textoHtml2 += `<li class="page-item"><a class="page-link" onclick='listarDocumentos(${paginaAtual + 1}, ${quantidadePorPagina})'>&gt;&gt;</a></li>\n`;
                textoHtml2 += `<li class="page-item"><a class="page-link" onclick='listarDocumentos(${quantidadeDePaginas}, ${quantidadePorPagina})'>Última</a></li>\n`;
            } else {
                // textoHtml2 += `<li class="page-item disabled"><a class="page-link">&gt;&gt;</a></li>\n`;
                textoHtml2 += `<li class="page-item disabled"><a class="page-link">Última</a></li>\n`;
            }

            $("#documentosPaginacaoAntes").html(textoHtml2);
            $("#documentosPaginacaoDepois").html(textoHtml2);
        }
    });
}