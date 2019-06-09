//desativar scroll do fundo, quando modal esta aberta
$('.modal').on('show.bs.modal', function(){ 
    $('.main-panel').perfectScrollbar('destroy');
}).on('hidden.bs.modal', function(){ 
    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
}); 

$(document).ready(function () {
    //usado para ativar a pagina atual no menu lateral esquerdo
    var url_atual = window.location.href;
    url_atual = url_atual.split('dashboard/')[1].replace(/#/gi, '');
    url_atual = '#pg'.concat(url_atual);
    // console.log(url_atual);
    $(url_atual).addClass('active');

    //retorna a vitima selecionada
    $('#vitimas').change(function () {
        $.ajax({
            url: "/getVitima",
            method: "POST",
            dataType: 'json',
            data: {
                idVitima: $(this).val()
            },
            success: function (data) {
                console.log(data);
                $("#idVitima").val(data.idVitima);
                $("#idVtm").val(data.idVitima);
                $("#pagina-vitima").attr("href", "/vitima?id=".concat(data.idVitima));
                $("#nome").val(data.nome);
                CKEDITOR.instances['descricao'].destroy();
                CKEDITOR.replace("descricao");
                CKEDITOR.instances['descricao'].setData(data.descricao);
                //$("#descricao").val(data.descricao);
                $("#idade").val(data.idade);
                $("#cidade").val(data.cidade);
                $("#legenda").val(data.legenda);

                if (data.sexo == 0) {
                    $("#sexo").val('M');
                } else {
                    $("#sexo").val('F');
                }

                if (data.nome) {
                    $("#card-nome").html(data.nome);
                } else {
                    $("#card-nome").html('Nome');
                }
                if (data.cidade) {
                    $("#card-cidade").html(data.cidade);
                } else {
                    $("#card-cidade").html('Cidade');
                }
                if (data.legenda) {
                    $("#card-legenda").html(data.legenda);
                } else {
                    $("#card-legenda").html('Legenda');
                }
                if (data.foto_capa) {
                    $("#foto_capa").attr("src", "../public/assets/" + data.foto_capa);
                } else {
                    $("#foto_capa").attr("src", "../public/assets/dashboard/img/fotografias/frente2.jpg");
                }

                if (data.estado == 0) {
                    $("#status").prop("checked", true);
                    $("#desativado").css("display", "inline");
                } else {
                    $("#status").prop("checked", false);
                    $("#desativado").css("display", "none");
                }

                $("#foto_perfil").attr("src", "../public/img/vitimas/" + data.foto_perfil);
            }
        });
    });

    //atualiza a vitima
    $('#btnAtualizarVitima').click(function () {
        if ($("#idVitima").val() != '' && $("#nome").val() != '') {
            var vitima = {};
            vitima.id = $("#idVitima").val();
            vitima.nome = $("#nome").val();
            vitima.descricao = CKEDITOR.instances.descricao.getData();
            vitima.idade = $("#idade").val();
            vitima.cidade = $("#cidade").val();
            vitima.legenda = $("#legenda").val();

            if ($("#status").is(":checked") == true) {
                vitima.status = 0;
            } else {
                vitima.status = 1;
            }

            vitima = JSON.stringify(vitima);
            $.ajax({
                url: "/atualizarVitima",
                method: "POST",
                dataType: 'json',
                data: {
                    vtm: vitima
                },
                success: function (data) {
                    if (data.nome) $("#card-nome").html(data.nome);
                    if (data.cidade) $("#card-cidade").html(data.cidade);
                    if (data.legenda) $("#card-legenda").html(data.legenda);
                    if (data.estado == 0) {
                        $("#desativado").css("display", "inline");
                    } else {
                        $("#desativado").css("display", "none");
                    }
                    $('#exampleModal').modal('show');
                }
            });
        } else {
            console.log('eh NULL')
        }
    });

    //rejeitar comentario
    $('.btnRejeitar').click(function () {
        var id = $(this).data('id_rejeitar');
        if (id != '') {
            $.ajax({
                url: "/rejeitarComentario",
                method: "POST",
                data: {
                    id: id
                },
                success: function (data) {
                    $('#textoModal').html('Comentário rejeitado com sucesso!');
                    $('#modalMensagem').modal('show');
                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
        }
    });

    //aceitar comentario
    $('.btnAceitar').click(function () {
        var id = $(this).data('id_aceitar');
        if (id != '') {
            $.ajax({
                url: "/aceitarComentario",
                method: "POST",
                data: {
                    id: id
                },
                success: function (data) {
                    $('#textoModal').html('Comentário aprovado com sucesso!');
                    $('#modalMensagem').modal('show');
                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
        }
    });

    //modal foto visualizar
    $(".imagem").click(function () {
        $("#modalConteudo").html("<img class='img-responsive' style='max-height: 500px' src='" + this.src + "'><div id='caption'>" + this.alt + "</div>");
        $("#modalImagem").modal();
    });

    $('.btnRejeitarFoto').click(function () {
        var id = $(this).data('id_rejeitar');
        if (id != '') {
            $.ajax({
                url: "/excluirFoto",
                method: "POST",
                data: {
                    id: id
                },
                success: function (data) {
                    $('#textoModal').html('Foto rejeitada com sucesso!');
                    $('#modalMensagem').modal('show');
                }
            });
        }
    });

    $('.btnAceitarFoto').click(function () {
        var id = $(this).data('id_aceitar');
        if (id != '') {
            $.ajax({
                url: "/aceitarFoto",
                method: "POST",
                data: {
                    id: id
                },
                success: function (data) {
                    $('#textoModal').html('Foto aprovada com sucesso!');
                    $('#modalMensagem').modal('show');
                }
            });
        }
    });

    $('.btnExcluirInfo').click(function () {
        var id = $(this).data('id_excluir');
        if (id != '') {
            $.ajax({
                url: "/excluirInfo",
                method: "POST",
                data: {
                    id: id
                },
                success: function (data) {
                    $('#textoModal').html('Informação excluída com sucesso!');
                    $('#modalMensagem').modal('show');
                }
            });
        }
    });
    $('.btnArquivarInfo').click(function () {
        var id = $(this).data('id_arquivar');
        if (id != '') {
            $.ajax({
                url: "/arquivarInfo",
                method: "POST",
                data: {
                    id: id
                },
                success: function (data) {
                    $('#textoModal').html('Informação arquivada com sucesso!');
                    $('#modalMensagem').modal('show');
                }
            });
        }
    });

    //selecionar vitima em "recordacao" na aba adicionar 
    $('#vtmAdicionarRecordacao').change(function () {
        $("#recordacoesAdicionar").css("display", "block");
        var link = "/vitima?id=" + $("#vtmAdicionarRecordacao").val();
        $("#linkVtm").attr("href", link);
    });

    let retornaMes = (mes) => {
        if(mes == 1) return 'Janeiro';
        if(mes == 2) return 'Fevereiro';
        if(mes == 3) return 'Março';
        if(mes == 4) return 'Abril';
        if(mes == 5) return 'Maio';
        if(mes == 6) return 'Junho';
        if(mes == 7) return 'Julho';
        if(mes == 8) return 'Agosto';
        if(mes == 9) return 'Setembro';
        if(mes == 10) return 'Outubro';
        if(mes == 11) return 'Novembro';
        if(mes == 12) return 'Dezembro';
    }

    //adiciona nova recordacao com administrador na aba "recordacoes"
    $('#btnAdicionarRecordacao').click(function () {
        var nome = $("#recordacaoNome").val();
        var sobrenome = $("#recordacaoSobrenome").val();
        var periodico = $("#recordacaoPeriodico").val();
        var descricao = CKEDITOR.instances.recordacaoDescricao.getData();
        var data = $("#recordacaoData").val();
        var pagina = $("#recordacaoPagina").val();


        if (nome && sobrenome && data && descricao && periodico && pagina) {
            nome = nome + " " + sobrenome;
            dataFormatada = data.split("-")[2] + " de " + retornaMes(data.split("-")[1]) + " de " + data.split("-")[0];
            descricaoPeriodico = periodico + ", " + dataFormatada + ". Página " + pagina + "."; 
            data = data + " 04:44:44";
            descricao = descricao + "<br/><br/><sup> " + descricaoPeriodico + " </sup>";

            var recordacao = {};
            recordacao.id = $("#vtmAdicionarRecordacao").val();
            recordacao.nome = nome;
            recordacao.data = data;
            recordacao.descricao = descricao;
            recordacao = JSON.stringify(recordacao);
            $.ajax({
                url: "/fazerComentarioAdmin",
                method: "POST",
                data: {
                    recordacao: recordacao
                },
                success: function (data) {
                    $('#textoModal').html('Recordação realizada com sucesso!');
                    $('#modalMensagem').modal('show');
                }
            });
        } else {
            $('#textoModalSemReload').html('Todos os campos são obrigatórios');
            $('#modalMensagemSemReload').modal('show');
        }
    });

    //recarregar pagina após fechamento do modal
    $('#modalMensagem').on('hidden.bs.modal', function () {
        location.reload();
    });

    //listar vitimas na aba "adicionar foto"
    $('#listaVitimasAddFoto').change(function () {
        $("#idVitimaAdd").val($(this).val());
        $("#uppyModalOpener").css("display", "inline");
    });

    //aceitar comentario
    $('.videoBtnAceitar').click(function () {
        var id = $(this).data('id_aceitar');
        if (id != '') {
            $.ajax({
                url: "/aceitarVideo",
                method: "POST",
                data: {
                    id: id
                },
                success: function (data) {
                    $('#textoModal').html('Vídeo aprovado com sucesso!');
                    $('#modalMensagem').modal('show');
                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
        }
    });

    //aceitar comentario
    $('.videoBtnRejeitar').click(function () {
        var id = $(this).data('id_rejeitar');
        if (id != '') {
            $.ajax({
                url: "/rejeitarVideo",
                method: "POST",
                data: {
                    id: id
                },
                success: function (data) {
                    $('#textoModal').html('Vídeo rejeitado com sucesso!');
                    $('#modalMensagem').modal('show');
                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
        }
    });

    //listar vitimas na aba "editar fotos"
    $('#listaVitimasEditFoto').change(function () {
        $("#mensagemSemFotos").css("display", "none");
        $("#fotosupadas").css("display", "none");
        var resultado = '';
        var tmp = '';
        $.ajax({
            url: "/getFotosVitima",
            method: "POST",
            dataType: 'json',
            data: {
                idVitima: $(this).val()
            },
            success: function (data) {
                /* SE NAO TEM NENHUMA FOTO */
                if (data == '') {
                    resultado = `
<div class="row">
    <div class="col-md-12 text-center">
        <div style="font-size: 14px">Essa vítima não tem nenhuma foto</div>
    </div>
</div>`;
                    $("#mensagemSemFotos").html(resultado);
                    $("#mensagemSemFotos").css("display", "inline");

                    /* SE TEM FOTO */
                } else {
                    $.each(data, function (i, foto) {
                        if (foto['legenda'] != null) tmp = foto['legenda']; else tmp = '';
                        resultado +=
                            `                            
    <div class="card card-user">
        <div class="card-body">
            <div class="row">
                <div class="col-md-3">
                    <div class="row">
                        <div class="col-md-12">
                            <label>Foto</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <img src="../public/img/fotos_vitimas/${foto['endereco_foto']}" style="width: 180px; height: 180px; object-fit: cover;" alt="${foto['legenda']}" class="img-thumbnail imagem">
                        </div>
                    </div><br />
                </div>

                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="form-group">
                                <label>Id da vítima</label>
                                <input class="form-control desativarInput" value="${foto['fk_idVitima']}" disabled>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="form-group">
                                <label>Nome da Vítima</label>
                                <input class="form-control desativarInput" value="${foto['nome']}" disabled>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label></label>
                                <div id="pagina" class="form-control"><a target="_blank" href="/vitima?id=${foto['fk_idVitima']}">Acessar perfil</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Descrição da foto</label>
                                <textarea class="form-control descricaotext" id="form${foto['idFoto']}" rows="3" placeholder="Descrição">${tmp}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                </div>
                <div class="col-md-6">
                    <div class="ml-auto float-right">
                        <button type="button" data-id_excluirfoto="${foto['idFoto']}" class="btn btn-danger btn-round btnExcluirFotoAdmin">EXCLUIR</button>
                        <button type="button" data-id_atualizarfoto="${foto['idFoto']}" class="btn btn-primary btn-round btnAtualizarFotoAdmin">ATUALIZAR</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br/>

    `;
                    });

                    $("#fotosRecebidas").html(resultado);
                    $("#fotosupadas").css("display", "inline");

                    $('.btnAtualizarFotoAdmin').click(function () {
                        var id = $(this).data('id_atualizarfoto');
                        var descricao = $('#form' + id).val();
                        if (id != '') {
                            $.ajax({
                                url: "/atualizarFoto",
                                method: "POST",
                                data: {
                                    id: id,
                                    descricao: descricao
                                },
                                success: function (data) {
                                    $('#textoModal').html('Foto atualizada com sucesso!');
                                    $('#modalMensagem').modal('show');
                                }
                            });
                        }
                    });

                    $(".imagem").click(function () {
                        if (this.alt == 'null') this.alt = '';
                        $("#modalConteudo").html("<img class='img-responsive' style='max-height: 500px' src='" + this.src + "'><div id='caption'>" + this.alt + "</div>");
                        $("#modalImagem").modal();
                    });

                    $('.btnExcluirFotoAdmin').click(function () {
                        var id = $(this).data('id_excluirfoto');
                        if (id != '') {
                            $.ajax({
                                url: "/excluirFoto",
                                method: "POST",
                                data: {
                                    id: id
                                },
                                success: function (data) {
                                    $('#textoModal').html('Foto excluída com sucesso!');
                                    $('#modalMensagem').modal('show');
                                }
                            });
                        }
                    });

                    $('.btnAtualizarFotoAdmin').click(function () {
                        var id = $(this).data('id_atualizarfoto');
                        var descricao = $('#form' + id).val();
                        if (id != '') {
                            $.ajax({
                                url: "/atualizarFoto",
                                method: "POST",
                                data: {
                                    id: id,
                                    descricao: descricao
                                },
                                success: function (data) {
                                    $('#textoModal').html('Foto atualizada com sucesso!');
                                    $('#modalMensagem').modal('show');
                                }
                            });
                        }
                    });
                }
                /* FIM DO ELSE */
            }
        });
    });


    //LISTAR RECORDACOES ACEITAS
    $('#listarComentariosAceitos').change(function () {
        $("#fotosupadas").css("display", "none");
        var resultado = '';
        var tmp = '';
        $.ajax({
            url: "/listarComentariosAceitos",
            method: "POST",
            dataType: 'json',
            data: {
                idVitima: $(this).val()
            },
            success: function (data) {
                /* SE NAO TEM RECORDACAO */
                if (data == '') {
                    resultado = `
<div class="row">
    <div class="col-md-12 text-center">
        <div style="font-size: 14px">Essa vítima não recebeu nenhuma recordação</div>
    </div>
</div>`;
                    /* SE TEM RECORDACAO */
                } else {
                    $.each(data, function (i, comentario) {
                        if (comentario['data'].indexOf("04:44:44") != -1) {
                            comentario['data'] = comentario['data'].split(' ')[0];
                        }

                        resultado += `
<div class="row secaoComentario">
    <div class="col-md-10 ml-auto mr-auto">
        <div class="card card-user">
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label>Remetente</label>
                                <div id="nome" class="form-control">${comentario['autor']}</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>E-mail do Remetente</label>
                                <div id="email" class="form-control">${comentario['email']}</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label></label>
                                <div id="pagina" class="form-control"><a target="_blank" href="/vitima?id=${comentario['fk_idVitima']}">Acessar perfil</a></div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Recordação:</label>
                                <div id="comentario" class="form-control" placeholder="Descrição" style="cursor: auto; padding: 10px 5px" disabled>${comentario['comentario']}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="container dataHora">
                                <div class="copyright float-left" style="margin-left: -10px">
                                    Recordação feita em:
                                    <br />${comentario['data']}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="ml-auto float-right" style="margin-top: -10px">
                                <button type="button" data-id_rejeitar="${comentario['idComentario']}" class="btn btn-danger btn-round btnRejeitar">EXCLUIR</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- end col-md-12 -->
</div>     
`;
                    });
                };
                /* FIM DO ELSE */

                $("#campoDeRecordacoes").html(resultado);
                $("#recordacoesRecebidas").css("display", "inline");

                $('.btnRejeitar').click(function () {
                    var id = $(this).data('id_rejeitar');
                    if (id != '') {
                        $.ajax({
                            url: "/rejeitarComentario",
                            method: "POST",
                            data: {
                                id: id
                            },
                            success: function (data) {
                                $('#textoModal').html('Recordação excluída com sucesso!');
                                $('#modalMensagem').modal('show');
                            },
                            error: function (request, status, error) {
                                alert(request.responseText);
                            }
                        });
                    }
                });
            }
        });
    });

    //listar videos na aba remover de "Videos"
    $('#videosListaRemover').change(function () {
        $("#mensagemSemVideos").css("display", "none");
        $("#videosaceitos").css("display", "none");
        var resultado = '';
        var tmp = '';
        $.ajax({
            url: "/getVideosVitima",
            method: "POST",
            dataType: 'json',
            data: {
                idVitima: $(this).val()
            },
            success: function (data) {
                if (data == '') {
                    resultado = `
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div style="font-size: 14px">Essa vítima não tem nenhum vídeo</div>
                            </div>
                        </div>
                        `;
                    $("#mensagemSemVideos").html(resultado);
                    $("#mensagemSemVideos").css("display", "inline");
                } else {
                    $.each(data, function (i, video) {
                        video['descricao'] = video['descricao'] == null ? 'Sem descrição' : video['descricao'];
                        resultado += `
                            <div class="row">
                                <div class="col-md-12 ml-auto mr-auto">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label>Vídeo recebido</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="embed-responsive embed-responsive-16by9">
                                                                <iframe class="embed-responsive-item"
                                                                    src="https://www.youtube.com/embed/${video['link']}"
                                                                    allowfullscreen></iframe>
                                                            </div>
                                                        </div>
                                                    </div><br />
                                                </div>
                            
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <div class="col-md-10 col-sm-10 col-10">
                                                            <div class="form-group">
                                                                <label>Vítima</label>
                                                                <div class="form-control" value="Nome" style="cursor:auto" disabled>${video['nomeVitima']}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2 col-sm-2 col-2">
                                                            <div class="form-group">
                                                                <label></label>
                                                                <div id="pagina" class="form-control">
                                                                    <a target="_blank" title="Acessar perfil da vítima"
                                                                        href="/vitima?id=${video['idVitima']}"><i
                                                                            class="fas fa-external-link-alt" style="font-size: 18px"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label>Nome do remetente</label>
                                                                <div class="form-control" value="Nome" style="cursor:auto" disabled>
                                                                    ${video['nomeRemetente']}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label>Descrição</label>
                                                                <textarea class="form-control" rows="2" style="cursor:auto"
                                                                    disabled>${video['descricao']}</textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="ml-auto float-right">
                                                                <button type="button" data-id_rejeitar="${video['idVideo']}"
                                                                    class="btn btn-danger btn-round videoBtnRejeitar">EXCLUIR</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    });

                    $("#campoDeVideos").html(resultado);
                    $("#videosAceitos").css("display", "inline");

                    //aceitar comentario
                    $('.videoBtnRejeitar').click(function () {
                        var id = $(this).data('id_rejeitar');
                        if (id != '') {
                            $.ajax({
                                url: "/rejeitarVideo",
                                method: "POST",
                                data: {
                                    id: id
                                },
                                success: function (data) {
                                    $('#textoModal').html('Vídeo excluído com sucesso!');
                                    $('#modalMensagem').modal('show');
                                },
                                error: function (request, status, error) {
                                    alert(request.responseText);
                                }
                            });
                        }
                    });
                }
            }
        });
    });
});