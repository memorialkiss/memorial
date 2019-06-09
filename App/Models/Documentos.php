<?php

namespace App\Models;
use MF\Model\Model;

class Documentos extends Model {
    private $idDocumento;
    private $titulo;
    private $periodico;
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
            "insert into documentos(titulo, periodico, data, numPagina, descricao, flagDesdobramento, flagVitima, fk_idVitima)". 
            "values(:titulo, :periodico, :data, :numPagina, :descricao, :flagDesdobramento, :flagVitima, :idVitima)";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':titulo', $this->__get('titulo'));
        $stmt->bindValue(':periodico', $this->__get('periodico'));
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

    public function getDocumentosPorPaginacao($inicio, $fim){
        $query = "select * from documentos order by idDocumento desc limit {$inicio}, {$fim}";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getContDocumentos(){
        $query = "select count(*) as contador from documentos";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $quantidade = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $quantidade['contador'];
    }

    public function atualizarDocumento(){
        $query = "update documentos set titulo = :titulo, periodico = :periodico, data = :data, numPagina = :numPagina, descricao = :descricao, flagDesdobramento = :fdesdo, flagVitima = :fvitima, fk_idVitima = :idvtm where idDocumento = :idDoc";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':idDoc', $this->__get('idDocumento'));
        $stmt->bindValue(':titulo', $this->__get('titulo'));
        $stmt->bindValue(':periodico', $this->__get('periodico'));
        $stmt->bindValue(':data', $this->__get('data'));
        $stmt->bindValue(':numPagina', $this->__get('numPagina'));
        $stmt->bindValue(':descricao', $this->__get('descricao'));
        $stmt->bindValue(':fdesdo', $this->__get('flagDesdobramento'));
        $stmt->bindValue(':fvitima', $this->__get('flagVitima'));
        $stmt->bindValue(':idvtm', $this->__get('fk_idVitima'));
        $stmt->execute();
    }
    
    public function excluirDocumento(){
        $query = "delete from documentos where idDocumento = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('idDocumento'));
        $stmt->execute();
    }

    public function backup(){
        $query = "select idDocumento as id, titulo, periodico as periodico, data, numPagina as numDaPagina, flagDesdobramento as incendioDesdobramento, flagVitima as relativoVitima, nome as nomeDaVitima, d.descricao FROM documentos as d left join vitimas as v on d.fk_idVitima = v.idVitima";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}