<?php

namespace App;

use MF\Init\Bootstrap;

class Route extends Bootstrap {

	protected function initRoutes() {

		$routes['home'] = array(
			'route' => '/',
			'controller' => 'indexController',
			'action' => 'index'
		);

		$routes['vitima'] = array(
			'route' => '/vitima',
			'controller' => 'indexController',
			'action' => 'vitima'
		);

		$routes['administrador'] = array(
			'route' => '/administrador',
			'controller' => 'AuthController',
			'action' => 'administrador'
		);

		$routes['autenticar'] = array(
			'route' => '/autenticar',
			'controller' => 'AuthController',
			'action' => 'autenticar'
		);

		$routes['dashboard'] = array(
			'route' => '/dashboard',
			'controller' => 'DashboardController',
			'action' => 'dashboard'
		);

		$routes['dashboard/vitimas'] = array(
			'route' => '/dashboard/vitimas',
			'controller' => 'DashboardController',
			'action' => 'vitimas'
		);

		$routes['dashboard/comentarios'] = array(
			'route' => '/dashboard/comentarios',
			'controller' => 'DashboardController',
			'action' => 'comentarios'
		);

		$routes['dashboard/fotos'] = array(
			'route' => '/dashboard/fotos',
			'controller' => 'DashboardController',
			'action' => 'fotos'
		);

		$routes['dashboard/informacoes'] = array(
			'route' => '/dashboard/informacoes',
			'controller' => 'DashboardController',
			'action' => 'informacoes'
		);

		$routes['sair'] = array(
			'route' => '/sair',
			'controller' => 'AuthController',
			'action' => 'sair'
		);

		$routes['getVitima'] = array(
			'route' => '/getVitima',
			'controller' => 'DashboardController',
			'action' => 'getVitima'
		);

		$routes['atualizarVitima'] = array(
			'route' => '/atualizarVitima',
			'controller' => 'DashboardController',
			'action' => 'atualizarVitima'
		);

		$routes['fazerComentario'] = array(
			'route' => '/fazerComentario',
			'controller' => 'DashboardController',
			'action' => 'fazerComentario'
		);

		$routes['rejeitarComentario'] = array(
			'route' => '/rejeitarComentario',
			'controller' => 'DashboardController',
			'action' => 'rejeitarComentario'
		);

		$routes['aceitarComentario'] = array(
			'route' => '/aceitarComentario',
			'controller' => 'DashboardController',
			'action' => 'aceitarComentario'
		);

		$routes['infoajudar'] = array(
			'route' => '/infoajudar',
			'controller' => 'indexController',
			'action' => 'infoajudar'
		);

		$routes['uploadimagens'] = array(
			'route' => '/uploadimagens',
			'controller' => 'indexController',
			'action' => 'uploadimagens'
		);

		$routes['uploadimagensadmin'] = array(
			'route' => '/uploadimagensadmin',
			'controller' => 'indexController',
			'action' => 'uploadimagensadmin'
		);

		$routes['formAjudar'] = array(
			'route' => '/formAjudar',
			'controller' => 'indexController',
			'action' => 'formAjudar'
		);

		$routes['excluirFoto'] = array(
			'route' => '/excluirFoto',
			'controller' => 'DashboardController',
			'action' => 'excluirFoto'
		);

		$routes['aceitarFoto'] = array(
			'route' => '/aceitarFoto',
			'controller' => 'DashboardController',
			'action' => 'aceitarFoto'
		);

		$routes['arquivarInfo'] = array(
			'route' => '/arquivarInfo',
			'controller' => 'DashboardController',
			'action' => 'arquivarInfo'
		);

		$routes['excluirInfo'] = array(
			'route' => '/excluirInfo',
			'controller' => 'DashboardController',
			'action' => 'excluirInfo'
		);

		$routes['enviarInformacao'] = array(
			'route' => '/enviarInformacao',
			'controller' => 'indexController',
			'action' => 'enviarInformacao'
		);

		$routes['getFotosVitima'] = array(
			'route' => '/getFotosVitima',
			'controller' => 'DashboardController',
			'action' => 'getFotosVitima'
		);

		$routes['atualizarFoto'] = array(
			'route' => '/atualizarFoto',
			'controller' => 'DashboardController',
			'action' => 'atualizarFoto'
		);

		$routes['enviarEmail'] = array(
			'route' => '/enviarEmail',
			'controller' => 'EmailController',
			'action' => 'enviarEmail'
		);

		$this->setRoutes($routes);
	}

}

?>