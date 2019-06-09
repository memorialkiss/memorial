<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

class DashboardController extends Action {
	public function dashboard() {
        header('Location: /dashboard/vitimas');
    }

    public function menu(){
        $comentarios = Container::getModel('Comentarios');
        $this->view->contComentarios = $comentarios->getContComentarios();
        
        $fotos = Container::getModel('Fotos');
        $this->view->contFotos = $fotos->getContFotos();

        $videos = Container::getModel('Videos');
        $this->view->contVideos = $videos->getContVideos();

        $info = Container::getModel('InfoAnalisar');
        $this->view->contInfo = $info->getContInfo();
        
    }

    //editar vitimas no dashboard
    public function vitimas() {
        $this->validaAutenticacao();
        $vitimas = Container::getModel('Vitimas');
        $this->view->vitimas = $vitimas->getAllDashboard();
        $vitimas->__set('id', '1');
        $this->view->vtm = $vitimas->getVitima();
        $this->menu();
        $this->render('vitimas', 'layout-dashboard');
    }

    public function validaAutenticacao(){
        session_start();
        if (!isset($_SESSION['id']) || $_SESSION['id'] == '' || !isset($_SESSION['nome']) || $_SESSION['nome'] == '') {
            header('Location: /administrador');
        }
    }

    //retorna vitima
    public function getVitima(){
        $this->validaAutenticacao();
        $vitima = Container::getModel('Vitimas');
        $vitima->__set('id', $_POST['idVitima']);
        $tmp = json_encode($vitima->getVitima());
        echo $tmp;
    }

    //retorna pagina de comentarios no dashboard
    public function recordacoes(){
        $this->validaAutenticacao();
        $comentario = Container::getModel('Comentarios');
        $this->view->comentarios = $comentario->getComentariosNaoAprovado();

        $vitimas = Container::getModel('Vitimas');
        $this->view->vitimas = $vitimas->getAllDashboard();

        $this->menu();
        $this->render('recordacoes', 'layout-dashboard');
    }

    //retorna comentarios aceitos no dashboard na aba visualizar/remover recordacoes
    public function listarComentariosAceitos(){
        $this->validaAutenticacao();
        $comentario = Container::getModel('Comentarios');
        $comentario->__set('idVitima', $_POST['idVitima']);

        echo (json_encode($comentario->getComentariosAprovadosDashboard()));
    }

    //fazer comentarios
    public function fazerComentario(){
        $comentario = Container::getModel('Comentarios');
        $tmp = json_decode($_POST['comentario']);
        $comentario->__set('idVitima', $tmp->id);
        $comentario->__set('nome', $tmp->nome);
        $comentario->__set('email', $tmp->email);
        $comentario->__set('comentario', $tmp->comentario);
        print_r($comentario->fazerComentario());
    }

    public function fazerComentarioAdmin(){
        $comentario = Container::getModel('Comentarios');
        $tmp = json_decode($_POST['recordacao']);
        $comentario->__set('idVitima', $tmp->id);
        $comentario->__set('nome', $tmp->nome);
        $comentario->__set('comentario', $tmp->descricao);
        $comentario->__set('data', $tmp->data);
        print_r($comentario->fazerComentarioAdmin());
    }

    //atualiza vitima no BD
    public function atualizarVitima(){
        $this->validaAutenticacao();
        $vitima = Container::getModel('Vitimas');
        $tmp = json_decode($_POST['vtm']);
        $vitima->__set('id', $tmp->id);
        $vitima->__set('nome', $tmp->nome);
        $vitima->__set('idade', $tmp->idade);
        $vitima->__set('descricao', $tmp->descricao);
        $vitima->__set('legenda', $tmp->legenda);
        $vitima->__set('cidade', $tmp->cidade);
        $vitima->__set('status', $tmp->status);
        $vitima->atualizarVitima();

        $tmp = json_encode($vitima->getVitima());
        echo $tmp;
    }

    public function rejeitarComentario(){
        $this->validaAutenticacao();
        $comentario = Container::getModel('Comentarios');
        $comentario->__set('id', $_POST['id']);
        $comentario->excluirComentario();
    }

    public function aceitarComentario(){
        $this->validaAutenticacao();
        $comentario = Container::getModel('Comentarios');
        $comentario->__set('id', $_POST['id']);
        $comentario->aceitarComentario();
    }

    public function fotos(){
        $this->validaAutenticacao();
        
        $fotos = Container::getModel('Fotos');
        $this->view->fotos = $fotos->getFotosNaoAprovadas();
        
        $vitimas = Container::getModel('Vitimas');
        $this->view->vitimas = $vitimas->getAllDashboard();
        
        $this->menu();
        $this->render('fotos', 'layout-dashboard');
    }

    public function videos(){
        $this->validaAutenticacao();
        
        $videos = Container::getModel('Videos');
        $this->view->videos = $videos->getVideosNaoAceitos();
        
        $vitimas = Container::getModel('Vitimas');
        $this->view->vitimas = $vitimas->getAllDashboard();
        
        $this->menu();
        $this->render('videos', 'layout-dashboard');
    }

    public function documentos(){
        $this->validaAutenticacao();

        $vitimas = Container::getModel('Vitimas');
        $this->view->vitimas = $vitimas->getAllDashboard();

        $documentos = Container::getModel('Documentos');
        $todosDocumentos = $documentos->getDocumentos();

        //se o documento for de vitima retorna o nome da vitima
        for($i=0; $i < count($todosDocumentos); $i++){
            if($todosDocumentos[$i]['flagVitima'] == 1){
                $vitimas->__set('id', $todosDocumentos[$i]['fk_idVitima']);
                $vtm = $vitimas->getVitima();
                $todosDocumentos[$i]['nomeVitima'] = $vtm['nome'];
            } else {
                $todosDocumentos[$i]['nomeVitima'] = null;
            }
        }

        $this->view->contDocumentos = $documentos->getContDocumentos();
        $this->view->documentos = $todosDocumentos;

        $materias = Container::getModel('DocMaterias');
        $this->view->materias = $materias->getMaterias();

        $this->menu();
        $this->render('documentos', 'layout-dashboard');
    }

    public function excluirFoto(){
        $this->validaAutenticacao();
        $foto = Container::getModel('Fotos');
        $foto->__set('id', $_POST['id']);
        print_r ($foto->excluirFoto());
    }

    public function aceitarFoto(){
        $this->validaAutenticacao();
        $foto = Container::getModel('Fotos');
        $foto->__set('id', $_POST['id']);
        $foto->aceitarFoto();
    }

    public function informacoes(){
        $this->validaAutenticacao();
        $info = Container::getModel('InfoAnalisar');
        $this->view->info = $info->getInfoNaoArquidas();
        $this->view->infoArquivadas = $info->getInfoArquidas();
        $this->menu();
        $this->render('informacoes', 'layout-dashboard');
    }

    public function backup(){
        $this->validaAutenticacao();
        $this->menu();
        $this->render('backup', 'layout-dashboard');
    }

    public function arquivarInfo(){
        $this->validaAutenticacao();
        $info = Container::getModel('infoAnalisar');
        $info->__set('idInfo', $_POST['id']);
        $info->arquivarInfo();
    }

    public function excluirInfo(){
        $this->validaAutenticacao();
        $info = Container::getModel('infoAnalisar');
        $info->__set('id', $_POST['id']);
        $info->excluirInfo();
    }

    public function getFotosVitima(){
        $this->validaAutenticacao();
        $foto = Container::getModel('Fotos');
        $foto->__set('idVitima', $_POST['idVitima']);
        echo (json_encode($foto->getFotosVitima()));
    }

    public function getVideosVitima(){
        $this->validaAutenticacao();
        $videos = Container::getModel('Videos');
        $videos->__set('fk_idVitima', $_POST['idVitima']);
        echo (json_encode($videos->getVideosVitimaFull()));
    }

    public function atualizarFoto(){
        $this->validaAutenticacao();
        $foto = Container::getModel('Fotos');
        $foto->__set('idFoto', $_POST['id']);
        $foto->__set('legenda', $_POST['descricao']);

        echo $foto->atualizarFoto();
    }

    public function adicionarDocumento(){
        $this->validaAutenticacao();
        $documento = Container::getModel('Documentos');

        $tmp = json_decode($_POST['documento']);
        $documento->__set('titulo', $tmp->titulo);
        $documento->__set('periodico', $tmp->periodico);
        $documento->__set('data', $tmp->data);
        $documento->__set('descricao', $tmp->descricao);
        $documento->__set('numPagina', $tmp->numPagina);
        $documento->__set('fk_idVitima', $tmp->fk_idVitima);
        $documento->__set('flagDesdobramento', $tmp->flagDesdobramento);
        $documento->__set('flagVitima', $tmp->flagVitima);
        $documento->gravarDocumento();
    }

    public function adicionarDocMateria(){
        $this->validaAutenticacao();
        $materia = Container::getModel('DocMaterias');
        $tmp = json_decode($_POST['materia']);

        $materia->__set('titulo', $tmp->titulo);
        $materia->__set('periodico', $tmp->periodico);
        $materia->__set('data', $tmp->data);
        $materia->__set('flagDesdobramento', $tmp->flagDesdobramento);
        $materia->__set('flagVitima', $tmp->flagVitima);
        $materia->adicionarDocMateria();
    }

    public function download(){
        $this->validaAutenticacao();
        if($_POST['escolha'] == 1) {
            $classe = Container::getModel('Vitimas');
        } else if($_POST['escolha'] == 2) {
            $classe = Container::getModel('Comentarios');
        } else if($_POST['escolha'] == 3) {
            $classe = Container::getModel('InfoAnalisar');
        } else {
            $classe = Container::getModel('Documentos');
        }
        echo (json_encode($classe->backup()));
    }

    public function listarDocumentos(){
        $this->validaAutenticacao();
        $documentos = Container::getModel('Documentos');
        
		//recebe pagina atual e quantidade de comentarios por pagina
		$paginaAtual = $_POST['paginaAtual'];
		$quantidadePorPagina = $_POST['quantidadePorPagina'];
		$inicio = ($paginaAtual * $quantidadePorPagina) - $quantidadePorPagina;
        $resultado = $documentos->getDocumentosPorPaginacao($inicio, $quantidadePorPagina);
        
        $vitimas = Container::getModel('Vitimas');
        for($i=0; $i < count($resultado); $i++){
            if($resultado[$i]['flagVitima'] == 1){
                $vitimas->__set('id', $resultado[$i]['fk_idVitima']);
                $vtm = $vitimas->getVitima();
                $resultado[$i]['nomeVitima'] = $vtm['nome'];
            } else {
                $resultado[$i]['nomeVitima'] = null;
            }
        }
        $this->view->contDocumentos = $documentos->getContDocumentos();

        echo json_encode($resultado);
    }

    public function atualizarDocumento(){
        $this->validaAutenticacao();
        $documento = Container::getModel('Documentos');
        $tmp = json_decode($_POST['documento']);
        $documento->__set('idDocumento', $tmp->idDoc);
        $documento->__set('titulo', $tmp->titulo);
        $documento->__set('periodico', $tmp->periodico);
        $documento->__set('data', $tmp->data);
        $documento->__set('numPagina', $tmp->numPagina);
        $documento->__set('descricao', $tmp->descricao);
        $documento->__set('flagDesdobramento', $tmp->flagDesdobramento);
        $documento->__set('flagVitima', $tmp->flagVitima);
        $documento->__set('fk_idVitima', $tmp->fk_idVitima);
        $documento->atualizarDocumento();
    }

    public function excluirDocumento(){
        $this->validaAutenticacao();
        $documento = Container::getModel('Documentos');
        $documento->__set('idDocumento', $_POST['iddoc']);
        $documento->excluirDocumento();
    }
}
?>