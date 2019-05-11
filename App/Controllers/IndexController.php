<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

class IndexController extends Action
{

	public function index()
	{
		$vitimas = Container::getModel('Vitimas');
		$this->view->vitimas = $vitimas->getAllSimplicified();
		$this->render('index', 'layout-index');
	}

	public function vitima()
	{
		if (!isset($_GET['id']) || $_GET['id'] == '' || $_GET['id'] < 1 || $_GET['id'] > 242) {
			header('Location: /');
		}
		//recebe informacoes da vitima
		$pessoa = Container::getModel('Vitimas');
		$pessoa->__set('id', $_GET['id']);

		//recebe comentarios
		$comentarios = Container::getModel('Comentarios');
		$comentarios->__set('idVitima', $_GET['id']);

		//
		$fotos = Container::getModel('Fotos');
		$fotos->__set('idVitima', $_GET['id']);

		$this->view->perfil_vitima = $pessoa->getVitima();
		$this->view->comentarios = $comentarios->getComentariosAprovado();
		$this->view->fotos = $fotos->getFotosVitima();

		$this->render('vitima', 'layout-vitima');
	}

	public function infoajudar()
	{
		if (!isset($_GET['id']) || $_GET['id'] == '' || $_GET['id'] < 1 || $_GET['id'] > 242) {
			header('Location: /');
		}
		$pessoa = Container::getModel('Vitimas');
		$pessoa->__set('id', $_GET['id']);
		
		$this->view->perfil_vitima = $pessoa->getVitima();
		$this->render('infoajudar', 'layout-infoajudar');
	}

	public function uploadimagens($admin = null)
	{
		$my_file = $_FILES['fotos'];
		$tipo = str_replace('/','',strrchr($_FILES['fotos']['type'], '/')); //pegar apenas extensao

		$file_path = $my_file['tmp_name'];

		$tmpIdFoto = 0;
		if($_POST['id'] < 10){
			$tmpIdFoto = '00'.$_POST['id'];
		} else if ($_POST['id'] < 100){
			$tmpIdFoto = '0'.$_POST['id'];
		} else {
			$tmpIdFoto = $_POST['id'];
		}

		$newname = 'id'.$tmpIdFoto.'_'.date('YmdHis',time()).mt_rand().'.'.$tipo;
		move_uploaded_file($file_path, 'public/img/fotos_vitimas/'.$newname);

		$fotos = Container::getModel('Fotos');
		$fotos->__set('enderecoFoto', $newname);
		
		if($admin == null){
			$fotos->__set('status', 0);
		} else {
			$fotos->__set('status', 1);
		}
		
		$fotos->__set('idVitima', $_POST['id']);

		if($_POST['legenda']!='undefined'){
			$fotos->__set('legenda', $_POST['legenda']);
		}
		if($_POST['nome']!='undefined'){
			$fotos->__set('nome', $_POST['nome']);
		}
		if($_POST['email']!='undefined'){
			$fotos->__set('email', $_POST['email']);
		}
		$fotos->uploadImagem();

		echo json_encode($_FILES['fotos']);
	}

	public function uploadimagensadmin(){
		$this->uploadimagens(1);
	}

	public function formAjudar(){
		$info = Container::getModel('infoAnalisar');
		$info->__set('nome', $_POST['nome']);
		$info->__set('email', $_POST['email']);
		$info->__set('parentesco', $_POST['parentesco']);
		$info->__set('youtube', $_POST['youtube']);
		$info->__set('descricao', $_POST['descricao']);
		$info->__set('fkIdVitima', $_POST['idVitima']);

		$info->submeterFormulario();
	}

	public function enviarInformacao(){
		$info = Container::getModel('InfoAnalisar');
        $tmp = json_decode($_POST['info']);
        $info->__set('fkIdVitima', $tmp->id);
        $info->__set('nome', $tmp->nome);
		$info->__set('email', $tmp->email);
		$info->__set('parentesco', $tmp->parentesco);
		$info->__set('youtube', $tmp->youtube);
		$info->__set('descricao', $tmp->descricao);
        print_r($info->submeterFormulario());
	}
}
