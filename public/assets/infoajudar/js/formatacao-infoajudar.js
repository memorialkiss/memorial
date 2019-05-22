$(document).ready(function() {
    window.onscroll = function() {
        disableNavbar()
    };

    const disableNavbar = () => {
        if ((document.body.scrollTop > 80 || document.documentElement.scrollTop > 80)) {
            $("#navegacao").css("display", "none");
        } else {
            $("#navegacao").css("display", "inline");
        }
    }

    if ((document.body.scrollTop > 80 || document.documentElement.scrollTop > 80)) {
        $("#navegacao").css("display", "none");
    };

    var url_atual = window.location.href;
    url_atual = url_atual.split('id=')[1];

    //envia informacoes
    $('#btnEnviarInformacao').click(function() {
        var tam = $("#descricao").val().length;

        if($("#nome").val() == ''){
            $('#mensagemDaModal').html('Você deve preencher o nome!');
            $('#modalMensagem2').modal('show');
            return false;
        } else if($("#email").val() == ''){
            $('#mensagemDaModal').html('Você deve preencher o e-mail!');
            $('#modalMensagem2').modal('show');
            return false;
        } else if($("#descricao").val() == '' || tam < 50){
            $('#mensagemDaModal').html('Você deve preencher a descrição e deve ter no mínimo 50 caracteres');
            $('#modalMensagem2').modal('show');
            return false;
        } else if($("#termodecompartilhamento").is(":checked")==false){
            $('#mensagemDaModal').html('Você deve estar de acordo com a política de compartilhamento');
            $('#modalMensagem2').modal('show');
            return false;
        }

        if ($("#nome").val() != '' && $("#email").val() != '' && $("#descricao").val() != '' && url_atual != '') {
            var info = {};
            info.id = url_atual;
            info.nome = $("#nome").val();
            info.email = $("#email").val();
            info.parentesco = $("#parentesco").val();
            info.youtube = $("#youtube").val();
            info.descricao = $("#descricao").val();
            info = JSON.stringify(info);
            $.ajax({
                url: "/enviarInformacao",
                method: "POST",
                data: {
                    info: info
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
        window.location.replace("/vitima?id=".concat(url_atual));
    })
});

var uppy = Uppy.Core({
    // debug: true,
    autoProceed: false,
    allowMultipleUploads: true,
    restrictions: {
        maxFileSize: 4000000,
        allowedFileTypes: ['image/jpeg', 'image/jpg', '.png']
    },
    onBeforeUpload: (files) => {
        const foto = Object.assign({}, files)
        Object.keys(foto).forEach(fileId => {
            uppy.setFileMeta(foto[fileId].id, {
                id: $("#idVitima").val(),
                legenda: foto[fileId].meta['caption'],
                nome: foto[fileId].meta['nome'],
                email: foto[fileId].meta['email']
            })
        })
    }
});

uppy.use(Uppy.Dashboard, {
    trigger: '#uppyModalOpener',
    showProgressDetails: true,
    showSelectedFiles: true,
    proudlyDisplayPoweredByUppy: false,
    animateOpenClose: true,
    closeModalOnClickOutside: true,
    metaFields: [
    {id: 'caption', name: 'Descrição da foto', placeholder: ''},
    {id: 'nome', name: 'Seu nome', placeholder: ''},
    {id: 'email', name: 'Seu email', placeholder: ''}
    ],
    locale: {
        strings: {
            closeModal: 'Fechar',
            addMoreFiles: 'Adicionar mais imagens',
            dashboardTitle: 'Upload de imagens',
            done: 'Pronto',
            removeFile: 'Remover imagem',
            editFile: 'Editar imagem',
            editing: 'Editando %{file}',
            edit: 'Editar legenda',
            finishEditingFile: 'Finalizar edição',
            dropPasteImport: 'Arraste as imagens até aqui ou importe de %{browse}',
            dropPaste: 'Arraste as imagens até aqui ou importe de %{browse}',
            browse: 'localizar',
            uploadComplete: 'Envio completado com sucesso!',
            uploadFailed: 'Falha ao enviar',
            resumeUpload: 'Retornar envio',
            pauseUpload: 'Pausar envio',
            paused: 'Pausado',
            error: 'Erro',
            back: 'Voltar',
            cancel: 'Cancelar',
            retryUpload: 'Repetir envio',
            xFilesSelected: {
                0: '%{smart_count} imagem (coloque uma legenda em Editar)',
                1: '%{smart_count} imagens (coloque uma legenda em Editar)'
            },
            uploading: 'Enviando',
            complete: 'Completo',
            uploadXFiles: {
                0: 'Enviar %{smart_count} imagem',
                1: 'Enviar %{smart_count} imagens'
            },
            uploadXNewFiles: {
                0: 'Enviar +%{smart_count} imagem',
                1: 'Enviar +%{smart_count} imagens'
            }
        }
    },
})

uppy.use(Uppy.XHRUpload, {
    endpoint: '/uploadimagens',
    method: 'post',
    fieldName: 'fotos',
})

var tmp = 0;
uppy.on('upload-success', function (fileId, data) { 
    uppy.getPlugin('Dashboard').closeModal();
    $('#mensagemDaModal').html('Envio completado com sucesso! <span style="color: red"><i class="fas fa-heart"></i>');
    $('#modalMensagem2').modal('show');
    tmp = 1;
});

$('#modalMensagem2').on('hidden.bs.modal', function () {
    if(tmp == 1) location.reload();
    tmp = 0;
});


