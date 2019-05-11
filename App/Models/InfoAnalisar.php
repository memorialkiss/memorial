<?php

namespace App\Models;
use MF\Model\Model;

class InfoAnalisar extends Model {
    private $idInfo;
    private $nome;
    private $email;
    private $parentesco;
    private $youtube;
    private $descricao;
    private $fkIdVitima;
    private $status;

    public function __get($atributo){
        return $this->$atributo;
    }

    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function submeterFormulario(){
        $query = "insert into infoAnalisar (nome, email, parentesco, youtube, descricao, fk_idVitima, status) values(:nome, :email, :parentesco, :youtube, :descricao, :fk, 0)";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':nome', $this->__get('nome'));
        $stmt->bindValue(':email', $this->__get('email'));
        $stmt->bindValue(':parentesco', $this->__get('parentesco'));
        $stmt->bindValue(':youtube', $this->__get('youtube'));
        $stmt->bindValue(':descricao', $this->__get('descricao'));
        $stmt->bindValue(':fk', $this->__get('fkIdVitima'));
        $stmt->execute();
    }

    public function getInfoNaoArquidas(){
        $query = "select idInfo, infoAnalisar.nome as nomeRemetente, email, infoAnalisar.descricao as descricao, parentesco, youtube, data, vitimas.nome as nomeVitima, idVitima from infoAnalisar, vitimas where fk_idVitima = idVitima AND status = 0 order by idInfo desc";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getInfoArquidas(){
        $query = "select idInfo, infoAnalisar.nome as nomeRemetente, email, infoAnalisar.descricao as descricao, parentesco, youtube, data, vitimas.nome as nomeVitima, idVitima from infoAnalisar, vitimas where fk_idVitima = idVitima AND status = 1 order by idInfo desc";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function arquivarInfo(){
        $query = "update infoAnalisar set status = 1 where idInfo = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('idInfo'));
        $stmt->execute();
    }

    public function excluirInfo(){
        $query = "delete from infoAnalisar where idInfo = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('id'));
        $stmt->execute();
    }

    public function getContInfo(){
        $query = "select count(*) as contador from infoAnalisar where status = 0";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}

?>