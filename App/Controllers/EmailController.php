<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

class EmailController extends Action
{
	public function enviarEmail()
	{
		$mensagem = Container::getModel('Email');
		$tmp = json_decode($_POST['mensagem']);

		$mensagem->__set('nome', $tmp->nome);
		$mensagem->__set('email', $tmp->email);
		$mensagem->__set('mensagem', $tmp->mensagem);

		if (!$mensagem->mensagemValida()) {
			echo '0';
			die();
		}
		$mensagem->enviarEmail();
		echo "1";
	}
}
