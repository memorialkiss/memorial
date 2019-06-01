<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

class JovensController extends Action
{
    public function jovens()
	{
		$vitima = Container::getModel('Vitimas');
		$this->view->jovens = $vitima->getAllSimplicified();
		$this->render('jovens', 'layout-jovens');
	}
}