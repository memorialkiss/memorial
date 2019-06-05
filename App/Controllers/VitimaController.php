<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

class VitimaController extends Action
{
	public function vitima()
	{
		if (!isset($_GET['id']) || $_GET['id'] == '' || $_GET['id'] < 1 || $_GET['id'] > 242) {
			header('Location: /jovens');
		}
		//recebe informacoes da vitima
		$pessoa = Container::getModel('Vitimas');
		$pessoa->__set('id', $_GET['id']);

		//comentarios
		$comentarios = Container::getModel('Comentarios');
		$comentarios->__set('idVitima', $_GET['id']);
		
		//fotos
		$fotos = Container::getModel('Fotos');
		$fotos->__set('idVitima', $_GET['id']);

		//videos
		$videos = Container::getModel('Videos');
		$videos->__set('fk_idVitima', $_GET['id']);

		$this->view->perfil_vitima = $pessoa->getVitima();
		$this->view->comentarios = $comentarios->getComentariosAprovado();
		// $this->view->fotos = $fotos->getFotosVitima();
		// $this->view->videos = $videos->getVideosVitima();
		$this->view->contRecordacoes = $comentarios->getContComentariosAceitos();
		$this->render('vitima', 'layout-vitima');
	}

	public function infoajudar()
	{
		if (!isset($_GET['id']) || $_GET['id'] == '' || $_GET['id'] < 1 || $_GET['id'] > 242) {
			header('Location: /jovens');
		}
		$pessoa = Container::getModel('Vitimas');
		$pessoa->__set('id', $_GET['id']);

		$this->view->perfil_vitima = $pessoa->getVitima();
		$this->render('infoajudar', 'layout-infoajudar');
	}

	//retorna fotos para pagina da vitima
	public function getFotosVideos(){
		$fotos = Container::getModel('Fotos');
		$fotos->__set('idVitima', $_POST['id']);

		$videos = Container::getModel('Videos');
		$videos->__set('fk_idVitima', $_POST['id']);

		$fotosResultado = $fotos->getFotosVitima();
		$videosResultado = $videos->getVideosVitima();

		$resultado = array_merge($fotosResultado, $videosResultado);

		echo (json_encode($resultado));
	}

	public function uploadimagens($admin = null)
	{
		$my_file = $_FILES['fotos'];
		$tipo = str_replace('/', '', strrchr($_FILES['fotos']['type'], '/')); //pegar apenas extensao

		$file_path = $my_file['tmp_name'];

		$tmpIdFoto = 0;
		if ($_POST['id'] < 10) {
			$tmpIdFoto = '00' . $_POST['id'];
		} else if ($_POST['id'] < 100) {
			$tmpIdFoto = '0' . $_POST['id'];
		} else {
			$tmpIdFoto = $_POST['id'];
		}

		$newname = 'id' . $tmpIdFoto . '_' . date('YmdHis', time()) . mt_rand() . '.' . $tipo;
		move_uploaded_file($file_path, 'public/img/fotos_vitimas/' . $newname);

		$fotos = Container::getModel('Fotos');
		$fotos->__set('enderecoFoto', $newname);

		if ($admin == null) {
			$fotos->__set('status', 0);
		} else {
			$fotos->__set('status', 1);
		}

		$fotos->__set('idVitima', $_POST['id']);

		if ($_POST['legenda'] != 'undefined') {
			$fotos->__set('legenda', $_POST['legenda']);
		}
		if ($_POST['nome'] != 'undefined') {
			$fotos->__set('nome', $_POST['nome']);
		}
		if ($_POST['email'] != 'undefined') {
			$fotos->__set('email', $_POST['email']);
		}
		$fotos->uploadImagem();

		echo json_encode($_FILES['fotos']);
	}

	public function uploadimagensadmin()
	{
		$this->uploadimagens(1);
	}

	public function formAjudar()
	{
		$info = Container::getModel('infoAnalisar');
		$info->__set('nome', $_POST['nome']);
		$info->__set('email', $_POST['email']);
		$info->__set('parentesco', $_POST['parentesco']);
		$info->__set('youtube', $_POST['youtube']);
		$info->__set('descricao', $_POST['descricao']);
		$info->__set('fkIdVitima', $_POST['idVitima']);

		$info->submeterFormulario();
	}

	public function enviarInformacao()
	{
		$info = Container::getModel('InfoAnalisar');
		$tmp = json_decode($_POST['info']);
		$info->__set('fkIdVitima', $tmp->id);
		$info->__set('nome', $tmp->nome);
		$info->__set('email', $tmp->email);
		$info->__set('parentesco', $tmp->parentesco);
		// $info->__set('youtube', $tmp->youtube);
		$info->__set('descricao', $tmp->descricao);
		print_r($info->submeterFormulario());
	}

	public function listarComentarios()
	{
		//recebe id da vitima
		$id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
		$comentarios = Container::getModel('Comentarios');
		$comentarios->__set('idVitima', $id);

		//recebe pagina atual e quantidade de comentarios por pagina
		$paginaAtual = $_POST['paginaAtual'];
		$quantidadePorPagina = $_POST['quantidadePorPagina'];
		$inicio = ($paginaAtual * $quantidadePorPagina) - $quantidadePorPagina;

		$resultado = $comentarios->getComentariosPorPaginacao($inicio, $quantidadePorPagina);

		echo json_encode($resultado);
	}

	public function jovens()
	{
		$vitima = Container::getModel('Vitimas');
		$this->view->jovens = $vitima->getAllSimplicified();
		$this->render('jovens', 'layout-jovens');
	}

	public function enviarVideo(){
		$video = Container::getModel('Videos');
		$tmp = json_decode($_POST['video']);
		$video->__set('fk_idVitima', $tmp->id);
		$video->__set('link', $tmp->link);
		$video->__set('nome', $tmp->nome);
		$video->__set('descricao', $tmp->descricao);
		print_r($video->submeterVideo());
	}

	public function aceitarVideo(){
		$video = Container::getModel('Videos');
		$video->__set('idVideo', $_POST['id']);
		$video->aceitarVideo();
	}

	public function rejeitarVideo(){
		$video = Container::getModel('Videos');
		$video->__set('idVideo', $_POST['id']);
		$video->rejeitarVideo();
	}
}