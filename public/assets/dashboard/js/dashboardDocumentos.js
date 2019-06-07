$(document).ready(function() {
    var quantidadePorPagina = 10;
    var paginaAtual = 1;
    listarDocumentos(paginaAtual, quantidadePorPagina); //Chamar a função para listar as recordacoes
});

function listarDocumentos(paginaAtual, quantidadePorPagina) {
    var dados = {
        paginaAtual: paginaAtual,
        quantidadePorPagina: quantidadePorPagina,
    }

    $.post('/listarDocumentos', dados, function(retorno) {
        var obj = JSON.parse(retorno);
        var textoHtml = '';
        var contRecordacoes = $("#documentosNavPaginacao").attr("quantidade"); //devolve a quantidade de documentos

        obj.forEach(function (documento){
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
                                        <label>Local da publicação</label>
                                        <div type="text" class="form-control">
                                            ${documento['localPublicacao']}
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
            $('html,body').animate({scrollTop:$("#paginacao2")}, 1000,'swing');
        });
        $("#documentosPaineis").html(textoHtml);

        var quantidadeDePaginas = Math.ceil(contRecordacoes/quantidadePorPagina);

        //paginacao
        if(quantidadeDePaginas > 1){
            var maxLinksPaginas;
            var textoHtml2 = '';
            
            maxLinksPaginas = (paginaAtual == 1 || paginaAtual == quantidadeDePaginas) ? 2 : 1;

            //pagina anterior
            if(paginaAtual == 1){
                textoHtml2 += `<li class="page-item disabled"><a class="page-link">Primeira</a></li>\n`;
            } else {
                textoHtml2 += `<li class="page-item"><a class="page-link" onclick='listarDocumentos(1, ${quantidadePorPagina})'>Primeira</a></li>\n`;
            }
            //antes da pagina atual
            for(let pgAnteriores = paginaAtual - maxLinksPaginas; pgAnteriores <= paginaAtual - 1; pgAnteriores++){
                if(pgAnteriores >= 1){
                    textoHtml2 += `<li class="page-item"><a class="page-link" onclick='listarDocumentos(${pgAnteriores}, ${quantidadePorPagina})'>${pgAnteriores}</a></li>\n`;
                }
            }
            //pagina atual
            textoHtml2 += `<li class="page-item active"><a class="page-link">${paginaAtual}</a></li>\n`;
            //depois da pagina atual
            for(let pgPosteriores = paginaAtual + 1; pgPosteriores <= paginaAtual + maxLinksPaginas; pgPosteriores++){
                if(pgPosteriores <= quantidadeDePaginas){
                    textoHtml2 += `<li class="page-item"><a class="page-link" onclick='listarDocumentos(${pgPosteriores}, ${quantidadePorPagina})'>${pgPosteriores}</a></li>\n`;
                }
            }
            //proxima pagina
            if(paginaAtual < quantidadeDePaginas){
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