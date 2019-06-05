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
			'controller' => 'VitimaController',
			'action' => 'vitima'
		);

		$routes['administrador'] = array(
			'route' => '/administrador',
			'controller' => 'AuthController',
			'action' => 'administrador'
		);

		$routes['jovens'] = array(
			'route' => '/jovens',
			'controller' => 'VitimaController',
			'action' => 'jovens'
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

		$routes['dashboard/recordacoes'] = array(
			'route' => '/dashboard/recordacoes',
			'controller' => 'DashboardController',
			'action' => 'recordacoes'
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

		$routes['dashboard/documentos'] = array(
			'route' => '/dashboard/documentos',
			'controller' => 'DashboardController',
			'action' => 'documentos'
		);

		$routes['dashboard/backup'] = array(
			'route' => '/dashboard/backup',
			'controller' => 'DashboardController',
			'action' => 'backup'
		);

		$routes['dashboard/videos'] = array(
			'route' => '/dashboard/videos',
			'controller' => 'DashboardController',
			'action' => 'videos'
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

		$routes['fazerComentarioAdmin'] = array(
			'route' => '/fazerComentarioAdmin',
			'controller' => 'DashboardController',
			'action' => 'fazerComentarioAdmin'
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

		$routes['listarComentariosAceitos'] = array(
			'route' => '/listarComentariosAceitos',
			'controller' => 'DashboardController',
			'action' => 'listarComentariosAceitos'
		);


		$routes['infoajudar'] = array(
			'route' => '/infoajudar',
			'controller' => 'VitimaController',
			'action' => 'infoajudar'
		);

		$routes['uploadimagens'] = array(
			'route' => '/uploadimagens',
			'controller' => 'VitimaController',
			'action' => 'uploadimagens'
		);

		$routes['uploadimagensadmin'] = array(
			'route' => '/uploadimagensadmin',
			'controller' => 'VitimaController',
			'action' => 'uploadimagensadmin'
		);

		$routes['formAjudar'] = array(
			'route' => '/formAjudar',
			'controller' => 'VitimaController',
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
			'controller' => 'VitimaController',
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

		$routes['listarComentarios'] = array(
			'route' => '/listarComentarios',
			'controller' => 'VitimaController',
			'action' => 'listarComentarios'
		);

		$routes['adicionarDocumento'] = array(
			'route' => '/adicionarDocumento',
			'controller' => 'DashboardController',
			'action' => 'adicionarDocumento'
		);

		$routes['getFotosVideos'] = array(
			'route' => '/getFotosVideos',
			'controller' => 'VitimaController',
			'action' => 'getFotosVideos'
		);

		$routes['download'] = array(
			'route' => '/download',
			'controller' => 'DashboardController',
			'action' => 'download'
		);

		$routes['enviarVideo'] = array(
			'route' => '/enviarVideo',
			'controller' => 'VitimaController',
			'action' => 'enviarVideo'
		);

		$routes['aceitarVideo'] = array(
			'route' => '/aceitarVideo',
			'controller' => 'VitimaController',
			'action' => 'aceitarVideo'
		);

		$routes['rejeitarVideo'] = array(
			'route' => '/rejeitarVideo',
			'controller' => 'VitimaController',
			'action' => 'rejeitarVideo'
		);

		$routes['getVideosVitima'] = array(
			'route' => '/getVideosVitima',
			'controller' => 'DashboardController',
			'action' => 'getVideosVitima'
		);

		$this->setRoutes($routes);
	}

}

?>