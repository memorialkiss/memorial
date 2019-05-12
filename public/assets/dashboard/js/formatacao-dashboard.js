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



    $('#modalMensagem').on('hidden.bs.modal', function () {
        location.reload();
    });

    $('#listaVitimasAddFoto').change(function () {
        $("#idVitimaAdd").val($(this).val());
        $("#uppyModalOpener").css("display", "inline");
    });

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
                            <label>Página da Vítima</label>
                            <div id="pagina" class="form-control"><a target="_blank" href="/vitima?id=${foto['fk_idVitima']}">Acessar</a></div>
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
});