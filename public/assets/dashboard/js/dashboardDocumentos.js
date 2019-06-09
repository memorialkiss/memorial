$(document).ready(function () {
    var quantidadePorPagina = 10;
    var paginaAtual = 1;
    documentosListar(paginaAtual, quantidadePorPagina); //Chamar a função para listar as recordacoes
});

$(document).ready(function () {
    $('#documentoBtnAdicionar').click(function () {
        let titulo = $("#documentoTitulo").val();
        let periodico = $("#documentoPeriodico").val();
        let data = $("#documentoData").val();
        let descricao = CKEDITOR.instances.documentoDescricao.getData();
        let checkDesdobramento = $("#documentoCheckDesdobramento").is(':checked');
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
        if (!checkDesdobramento) checkDesdobramento = 0;
        if (!checkVitima) {
            checkVitima = 0;
            idVitima = null;
        }

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

    $('#materiaBtnAdicionar').click(function () {
        // let titulo = 
        let titulo = $("#materiaTitulo").val();
        let periodico = $("#materiaPeriodico").val();
        let data = $("#materiaData").val();
        let checkDesdobramento = $("#materiaCheckDesdobramento").is(':checked');
        let checkVitima = $("#materiaCheckVitima").is(':checked');

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
        let materia = {};
        materia.titulo = titulo;
        materia.periodico = periodico;
        materia.data = data;
        materia.flagDesdobramento = checkDesdobramento;
        materia.flagVitima = checkVitima;
        materia = JSON.stringify(materia);
        $.ajax({
            url: "/adicionarDocMateria",
            method: "POST",
            data: {
                materia: materia
            },
            success: function (data) {
                $('#textoModal').html("Matéria cadastrado com sucesso");
                $('#modalMensagem').modal('show');
            }
        });
    });

    //selecionar um Materia no cadastro de documentos
    $('#documentoMateria').change(function () {
        let obj = {};
        obj.titulo = $('option:selected', this).attr('titulo');
        obj.periodico = $('option:selected', this).attr('periodico');
        obj.data = $('option:selected', this).attr('data');
        obj.fdesdo = $('option:selected', this).attr('fdesdobramento');
        obj.fvitima = $('option:selected', this).attr('fvitima');

        $("#documentoTitulo").val(obj.titulo);
        $("#documentoPeriodico").val(obj.periodico);
        $("#documentoData").val(obj.data);

        if (obj.fdesdo == '1') {
            $("#documentoCheckDesdobramento").prop("checked", true);
        } else {
            $("#documentoCheckDesdobramento").prop("checked", false);
        }

        if (obj.fvitima == '1') {
            $("#documentoCheckVitima").prop("checked", true);
            $("#divSelecionarVitima").css('display', 'inline');
        } else {
            $("#divSelecionarVitima").css('display', 'none');
            $("#documentoCheckVitima").prop("checked", false);
        }
    });
});

//editar documento
$(document).ready(function () {
    $('#editarBtnAtualizar').click(function () {
        let titulo = $("#editarTitulo").val();
        let periodico = $("#editarPeriodico").val();
        let data = $("#editarData").val();
        let descricao = CKEDITOR.instances.editarDescricao.getData();
        let checkDesdobramento = $("#editarCheckDesdo").is(':checked');
        let checkVitima = $("#editarCheckVitima").is(':checked');
        let idVitima = $("#editarIdVitima").val();
        let pagina = $("#editarPagina").val();
        let idDoc = $("#editarBtnAtualizar").attr('iddoc');

        //verificacoes dos campos
        if (!titulo) {
            $('#editarAlerta').html('<div class="alert alert-danger" role="alert">Você deve colocar um título na publicação<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $('#modalEditarDocumento').animate({scrollTop:0}, 'slow');
            return;
        } else if (!periodico) {
            $('#editarAlerta').html('<div class="alert alert-danger" role="alert">Você deve colocar o nome do periódico<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $('#modalEditarDocumento').animate({scrollTop:0}, 'slow');
            return;
        } else if (!data) {
            $('#editarAlerta').html('<div class="alert alert-danger" role="alert">Você deve colocar a data da publicação<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $('#modalEditarDocumento').animate({scrollTop:0}, 'slow');
            return;
        } else if (!descricao) {
            $('#editarAlerta').html('<div class="alert alert-danger" role="alert">Você deve transcrever a matéria<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $('#modalEditarDocumento').animate({scrollTop:0}, 'slow');
            return;
        } else if (!checkDesdobramento && !checkVitima) {
            $('#editarAlerta').html('<div class="alert alert-danger" role="alert">Você deve selecionar o assunto da publicação<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $('#modalEditarDocumento').animate({scrollTop:0}, 'slow');
            return;
        } else if (checkVitima && !idVitima) {
            $('#editarAlerta').html('<div class="alert alert-danger" role="alert">Você deve selecionar a vítima<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $('#modalEditarDocumento').animate({scrollTop:0}, 'slow');
            return;
        }

        //atribuicoes padrao
        if (!pagina) pagina = null;
        if (!checkDesdobramento) checkDesdobramento = 0;
        if (!checkVitima) {
            checkVitima = 0;
            idVitima = null;
        }

        //enviar documento
        var documento = {};
        documento.idDoc = idDoc;
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
            url: "/atualizarDocumento",
            method: "POST",
            data: {
                documento: documento
            },
            success: function (data) {
                $('#modalEditarDocumento').modal('hide');
                $('#textoModal').html("Documento atualizado com sucesso");
                $('#modalMensagem').modal('show');
            },
            error: function (request, status, error) {
                $('#modalEditarDocumento').modal('hide');
                $('#textoModal').html("Erro ao atualizar, tente novamente mais tarde");
                $('#modalMensagem').modal('show');
            }
        });
    });


    $("#editarCheckVitima").click(function () {
        if ($("#editarCheckVitima").is(':checked')) {
            $("#editarSeletorVitima").css('display', 'inline');
        } else {
            $("#editarSeletorVitima").css('display', 'none');
        }
    });

    $(document).on('click', '.documentoBtnEditar', function() {
        let obj = {};
        obj.titulo = $(this).attr('titulo');
        obj.descricao = entidadesHTML.decodificar($(this).attr('descricao'));
        obj.periodico = $(this).attr('periodico');
        obj.data = $(this).attr('data');
        obj.pagina = $(this).attr('pagina');
        obj.fdesdo = $(this).attr('fdesdo');
        obj.fvitima = $(this).attr('fvitima');
        obj.idVtm = $(this).attr('idVtm');
        obj.idDoc = $(this).attr('idDoc');

        $("#editarTitulo").val(obj.titulo);
        $("#editarPagina").val(obj.pagina);
        $("#editarPeriodico").val(obj.periodico);
        $("#editarData").val(obj.data);
        if(obj.fdesdo == '1') {
            $("#editarCheckDesdo").prop("checked", true);
        } else {
            $("#editarCheckDesdo").prop("checked", false);
        }

        if(obj.fvitima == '1') {
            $("#editarCheckVitima").prop("checked", true);
            $("#editarIdVitima").val(obj.idVtm);
            $("#editarSeletorVitima").css('display', 'inline');
        } else {
            $("#editarCheckVitima").prop("checked", false);
            $("#editarSeletorVitima").css('display', 'none');
        }

        $("#editarBtnAtualizar").attr("iddoc", obj.idDoc);
        CKEDITOR.instances['editarDescricao'].destroy();
        CKEDITOR.replace("editarDescricao");
        CKEDITOR.instances['editarDescricao'].setData(obj.descricao);

        $("#modalEditarDocumento").modal();
    });
});

$('#excluirBtn').click(function () {
    let iddoc = $("#excluirBtn").attr('iddoc');
    $.ajax({
        url: "/excluirDocumento",
        method: "POST",
        data: {
            iddoc: iddoc
        },
        success: function (data) {
            $('#modalExcluirDocumento').modal('hide');
            $('#textoModal').html("Documento excluido com sucesso");
            $('#modalMensagem').modal('show');
        },
        error: function (request, status, error) {
            $('#modalExcluirDocumento').modal('hide');
            $('#textoModal').html("Erro ao excluir, tente novamente mais tarde");
            $('#modalMensagem').modal('show');
        }
    });
});

$(document).on('click', '.documentoBtnExcluir', function() {
    let idDoc = $(this).attr('idDoc');
    $("#excluirBtn").attr("iddoc", idDoc);
    $('#modalExcluirDocumento').modal('show');
});


function documentosListar(paginaAtual, quantidadePorPagina) {
    var dados = {
        paginaAtual: paginaAtual,
        quantidadePorPagina: quantidadePorPagina,
    }

    $.post('/listarDocumentos', dados, function (retorno) {
        var obj = JSON.parse(retorno);
        var textoHtml = '';
        var contRecordacoes = $("#documentosNavPaginacao").attr("quantidade"); //devolve a quantidade de documentos

        obj.forEach(function (documento) {
            //variaveis usadas para o botao editar
            let descricao = entidadesHTML.codificar(documento['descricao']);
            let fdesdo = documento['flagDesdobramento'];
            let fvitima = documento['flagVitima'];
            let idVtm = documento['fk_idVitima'];
            let idDoc = documento['idDocumento'];

            //verificacoes numero de pagina e flags
            documento['numPagina'] = documento['numPagina'] != '' ? documento['numPagina'] : 'Não especificado';
            documento['flagDesdobramento'] = documento['flagDesdobramento'] == 1 ? 'checked' : '';
            documento['flagVitima'] = documento['flagVitima'] == 1 ? 'checked' : '';

            //verifica se o documento eh de uma vitima
            if (documento['nomeVitima'] != null) {
                documento['nomeVitima'] =
                    `<div class="col-md-6 exibeVitima">
                        <label>Nome da Vítima</label>
                        <div type="text" class="form-control">
                            ${documento['nomeVitima']}
                        </div>
                    </div>`;
            } else {
                documento['nomeVitima'] = '';
            }

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
                                                <input id="documentoCheckDesdobramento" class="form-check-input" type="checkbox" ${documento['flagDesdobramento']} disabled>
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
                                    ${documento['nomeVitima']}
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

                            <div class="modal-footer">
                                <div class="right-side">
                                    <button type="button" class="btn btn-danger btn-link documentoBtnExcluir" idDoc="${idDoc}">Excluir</button>
                                </div>
                                <div class="divider"></div>
                                <div class="left-side">
                                    <button type="button" class="btn btn-default btn-link documentoBtnEditar"
                                        idDoc="${idDoc}"
                                        titulo="${documento['titulo']}" 
                                        periodico="${documento['periodico']}" 
                                        descricao="${descricao}" 
                                        data="${documento['data']}" 
                                        pagina="${documento['numPagina']}" 
                                        fdesdo="${fdesdo}"
                                        fvitima="${fvitima}"
                                        idvtm="${idVtm}">Editar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            `;
            // $('html,body').animate({ scrollTop: $("#paginacao2") }, 1000, 'swing');
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
                textoHtml2 += `<li class="page-item"><a class="page-link" onclick='documentosListar(1, ${quantidadePorPagina})'>Primeira</a></li>\n`;
            }
            //antes da pagina atual
            for (let pgAnteriores = paginaAtual - maxLinksPaginas; pgAnteriores <= paginaAtual - 1; pgAnteriores++) {
                if (pgAnteriores >= 1) {
                    textoHtml2 += `<li class="page-item"><a class="page-link" onclick='documentosListar(${pgAnteriores}, ${quantidadePorPagina})'>${pgAnteriores}</a></li>\n`;
                }
            }
            //pagina atual
            textoHtml2 += `<li class="page-item active"><a class="page-link">${paginaAtual}</a></li>\n`;
            //depois da pagina atual
            for (let pgPosteriores = paginaAtual + 1; pgPosteriores <= paginaAtual + maxLinksPaginas; pgPosteriores++) {
                if (pgPosteriores <= quantidadeDePaginas) {
                    textoHtml2 += `<li class="page-item"><a class="page-link" onclick='documentosListar(${pgPosteriores}, ${quantidadePorPagina})'>${pgPosteriores}</a></li>\n`;
                }
            }
            //proxima pagina
            if (paginaAtual < quantidadeDePaginas) {
                // textoHtml2 += `<li class="page-item"><a class="page-link" onclick='listarDocumentos(${paginaAtual + 1}, ${quantidadePorPagina})'>&gt;&gt;</a></li>\n`;
                textoHtml2 += `<li class="page-item"><a class="page-link" onclick='documentosListar(${quantidadeDePaginas}, ${quantidadePorPagina})'>Última</a></li>\n`;
            } else {
                // textoHtml2 += `<li class="page-item disabled"><a class="page-link">&gt;&gt;</a></li>\n`;
                textoHtml2 += `<li class="page-item disabled"><a class="page-link">Última</a></li>\n`;
            }

            $("#documentosPaginacaoAntes").html(textoHtml2);
            $("#documentosPaginacaoDepois").html(textoHtml2);
        }
    });
}

var entidadesHTML = () => {};
entidadesHTML.map={"'":"&apos;","<":"&lt;",">":"&gt;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ƒ":"&fnof;","ˆ":"&circ;","˜":"&tilde;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&Upsih;","ϖ":"&piv;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","•":"&bull;","…":"&hellip;","‰":"&permil;","′":"&prime;","″":"&Prime;","‹":"&lsaquo;","›":"&rsaquo;","‾":"&oline;","⁄":"&frasl;","€":"&euro;","ℑ":"&image;","℘":"&weierp;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&UArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","⟨":"&lang;","⟩":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"};

entidadesHTML.codificar = function(string) {
    var entityMap = entidadesHTML.map;
    string = string.replace(/&/g, '&amp;');
    string = string.replace(/"/g, '&quot;');
    for (var key in entityMap) {
        var entity = entityMap[key];
        var regex = new RegExp(key, 'g');
        string = string.replace(regex, entity);
    }
    return string;
}

entidadesHTML.decodificar = function(string) {
    var entityMap = entidadesHTML.map;
    for (var key in entityMap) {
        var entity = entityMap[key];
        var regex = new RegExp(entity, 'g');
        string = string.replace(regex, key);
    }
    string = string.replace(/&quot;/g, '"');
    string = string.replace(/&amp;/g, '&');
    return string;
}