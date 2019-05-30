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
    public function comentarios(){
        $this->validaAutenticacao();
        $comentario = Container::getModel('Comentarios');
        $this->view->comentarios = $comentario->getComentariosNaoAprovado();

        $vitimas = Container::getModel('Vitimas');
        $this->view->vitimas = $vitimas->getAllDashboard();

        $this->menu();
        $this->render('comentarios', 'layout-dashboard');
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

    public function atualizarFoto(){
        $this->validaAutenticacao();
        $foto = Container::getModel('Fotos');
        $foto->__set('idFoto', $_POST['id']);
        $foto->__set('legenda', $_POST['descricao']);

        echo $foto->atualizarFoto();
    }
}

?>