var uppy = Uppy.Core({
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
                id: $("#idVitimaAdd").val(),
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
    {id: 'caption', name: 'Descrição da foto', placeholder: 'campo não obrigatório'},
    {id: 'nome', name: 'Seu nome', placeholder: 'campo não obrigatório'},
    {id: 'email', name: 'Seu email', placeholder: 'campo não obrigatório'}
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
    endpoint: '/uploadimagensadmin',
    method: 'post',
    fieldName: 'fotos',
})

uppy.on('upload-success', function (fileId, data) { 
    uppy.getPlugin('Dashboard').closeModal();
    $('#textoModal').html('Upload completado com sucesso!');
    $('#modalMensagem').modal('show');
});