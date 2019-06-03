$(document).ready(function () {
    //usado para ativar a pagina atual no menu lateral esquerdo
    var url_atual = window.location.href;
    url_atual = url_atual.split('dashboard/')[1].replace(/#/gi, '');
    url_atual = '#pg'.concat(url_atual);
    console.log(url_atual);
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

                if(data.sexo == 0){
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

                if(data.estado==0){
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
            
            if($("#status").is(":checked")==true){
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
                    if (data.estado==0){
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
        $("#linkVtm"). attr("href", link);
    });

    //adiciona nova recordacao com administrador na aba "recordacoes"
    $('#btnAdicionarRecordacao').click(function () {
        if($("#recordacaoNome").val()&&$("#recordacaoSobrenome").val()&&$("#recordacaoData").val()&&$("#recordacaoDescricao").val()&&$("#recordacaoLugar").val()){
            var nome = $("#recordacaoNome").val() + " " + $("#recordacaoSobrenome").val(); 
            var data = $("#recordacaoData").val() + " 04:44:44";
            var descricao = $("#recordacaoDescricao").val() + "<br/><br/><sup>"+$("#recordacaoLugar").val()+"</sup>";

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
                success: function(data) {
                    $('#textoModal').html('Recordação realizada com sucesso!');
                    $('#modalMensagem').modal('show');
                }
            });
        } else {
            $('#textoModalSemReload').html('Todos os campos são obrigatórios');
            $('#modalMensagemSemReload').modal('show');
        }
    });

    $('#documentoBtnAdicionar').click(function () {
        // let titulo = 
        let titulo = $("#documentoTitulo").val();
        let local = $("#documentoLocal").val();
        let data = $("#documentoData").val();
        let descricao = $("#documentoDescricao").val();
        let checkDesdobramento = $("#documentoCheckDescobramento").is(':checked');
        let checkVitima = $("#documentoCheckVitima").is(':checked');
        let idVitima = $("#documentoIdVitima").val();
        let pagina = $("#documentoPagina").val();

        //verificacoes dos campos
        if(!titulo){
            $('#textoModalSemReload').html('Você deve colocar um título na publicação');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if(!local){
            $('#textoModalSemReload').html('Você deve colocar o local da publicação');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if(!data){
            $('#textoModalSemReload').html('Você deve colocar a data da publicação');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if(!descricao){
            $('#textoModalSemReload').html('Você deve transcrever a matéria');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if(!checkDesdobramento&&!checkVitima){
            $('#textoModalSemReload').html('Você deve selecionar o assunto da publicação');
            $('#modalMensagemSemReload').modal('show');
            return;
        } else if(checkVitima&&!idVitima){
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
        documento.localPublicacao = local;
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
            success: function(data) {
                $('#textoModal').html("Documento cadastrado com sucesso");
                $('#modalMensagem').modal('show');
            }
        });
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

    //listar vitimas na aba "editar fotos"
    $('#listaVitimasEditFoto').change(function () {
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
                    $("#fotosRecebidas").html(resultado);
                    $("#fotosupadas").css("display", "inline");

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
                        var descricao = $('#form'+id).val();
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
                });
            }
        });
    });


    //listar comentarios aceitos
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
                console.log(data);
                $.each(data, function (i, comentario) {
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
                                <textarea id="comentario" class="form-control" rows="5" placeholder="Descrição"
                                    style="cursor: auto" disabled>${comentario['comentario']}</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <footer>
                                <div class="container dataHora">
                                    <div class="copyright float-left">
                                        Recordação feita em:
                                        <br />${comentario['data']}
                                    </div>
                                </div>
                            </footer>
                        </div>
                        <div class="col-md-6">
                            <div class="ml-auto float-right">
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

    $("#documentoCheckVitima").click(function () {  
        if( $("#documentoCheckVitima").is(':checked') ){
            $("#divSelecionarVitima").css('display', 'inline');
        } else {
            $("#divSelecionarVitima").css('display', 'none');
        }
    });
});