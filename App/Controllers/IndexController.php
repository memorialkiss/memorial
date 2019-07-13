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
		// $this->view->vitimas = $vitimas->getAllSimplicified();
		$this->render('index', 'layout-index');
	}

	public function inicio()
	{
		$vitimas = Container::getModel('Vitimas');
		$this->render('inicio', 'layout-index');
	}
}
