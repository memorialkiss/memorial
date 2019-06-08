<?php

namespace App\Models;
use MF\Model\Model;

class DocEventos extends Model {
    private $idEvento;
    private $titulo;
    private $localPublicacao;
    private $data;
    private $numPagina;
    private $flagDesdobramento;
    private $flagVitima;

    public function __get($atributo){
        return $this->$atributo;
    }

    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }
}