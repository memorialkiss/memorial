<?php

namespace App\Models;
use MF\Model\Model;

class DocEventos extends Model {
    private $idEvento;
    private $titulo;
    private $periodico;
    private $data;
    private $flagDesdobramento;
    private $flagVitima;

    public function __get($atributo){
        return $this->$atributo;
    }

    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function adicionarDocEvento(){
        $query = 
            "insert into docEventos(titulo, periodico, data, flagDesdobramento, flagVitima)". 
            "values(:titulo, :periodico, :data, :flagDesdobramento, :flagVitima)";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':titulo', $this->__get('titulo'));
        $stmt->bindValue(':periodico', $this->__get('periodico'));
        $stmt->bindValue(':data', $this->__get('data'));
        $stmt->bindValue(':flagDesdobramento', $this->__get('flagDesdobramento'));
        $stmt->bindValue(':flagVitima', $this->__get('flagVitima'));
        $stmt->execute();
        return $this;
    }

    public function getEventos(){
        $query = "select * from docEventos";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}