<?php

namespace App\Models;
use MF\Model\Model;

class Documentos extends Model {
    private $idDocumento;
    private $titulo;
    private $localPublicacao;
    private $data;
    private $numPagina;
    private $descricao;
    private $flagDesdobramento;
    private $flagVitima;
    private $fk_idVitima;

    public function __get($atributo){
        return $this->$atributo;
    }

    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function gravarDocumento(){
        $query = 
            "insert into documentos(titulo, localPublicacao, data, numPagina, descricao, flagDesdobramento, flagVitima, fk_idVitima)". 
            "values(:titulo, :localPublicacao, :data, :numPagina, :descricao, :flagDesdobramento, :flagVitima, :idVitima)";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':titulo', $this->__get('titulo'));
        $stmt->bindValue(':localPublicacao', $this->__get('localPublicacao'));
        $stmt->bindValue(':data', $this->__get('data'));
        $stmt->bindValue(':numPagina', $this->__get('numPagina'));
        $stmt->bindValue(':descricao', $this->__get('descricao'));
        $stmt->bindValue(':flagDesdobramento', $this->__get('flagDesdobramento'));
        $stmt->bindValue(':flagVitima', $this->__get('flagVitima'));
        $stmt->bindValue(':idVitima', $this->__get('fk_idVitima'));
        $stmt->execute();
        return $this;
    }

    public function getDocumentos(){
        $query = "select * from documentos order by idDocumento desc";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function backup(){
        $query = "select idDocumento as id, titulo, localPublicacao as localDaPublicacao, data, numPagina as numDaPagina, flagDesdobramento as incendioDesdobramento, flagVitima as relativoVitima, nome as nomeDaVitima, d.descricao FROM documentos as d left join vitimas as v on d.fk_idVitima = v.idVitima";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}