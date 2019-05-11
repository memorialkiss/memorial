<?php

namespace App\Models;
use MF\Model\Model;

class Fotos extends Model {
    private $idFoto;
    private $enderecoFoto;
    private $nome;
    private $email;
    private $status;
    private $legenda;
    private $idVitima;

    public function __get($atributo){
        return $this->$atributo;
    }

    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function getContFotos(){
        $query = "select count(*) as contador from fotos where status = 0";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function uploadImagem(){
        $query = "insert into fotos(endereco_foto, status, fk_idVitima";
  
        //tabelas
        if($this->__get('legenda')) $query = $query.', legenda';
        if($this->__get('nome')) $query = $query.', nome';
        if($this->__get('email')) $query = $query.', email';

        $query = $query.') values(:end, :status, :fkId';

        //values
        if($this->__get('legenda')) $query = $query.', :legenda';
        if($this->__get('nome')) $query = $query.', :nome';
        if($this->__get('email')) $query = $query.', :email';
        
        $query = $query.')';

        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':end', $this->__get('enderecoFoto'));
        $stmt->bindValue(':status', $this->__get('status'));
        $stmt->bindValue(':fkId', $this->__get('idVitima'));

        if($this->__get('legenda')) $stmt->bindValue(':legenda', $this->__get('legenda'));
        if($this->__get('nome')) $stmt->bindValue(':nome', $this->__get('nome'));
        if($this->__get('email')) $stmt->bindValue(':email', $this->__get('email'));
        
        $stmt->execute();
        return $this;
    }

    public function getFotosNaoAprovadas(){
        //$query = "select idFoto, endereco_foto, fotos.nome as nomeRemetente, email, idVitima, vitimas.nome as nomeVitima, email, legenda from fotos, vitimas where status=0 and fk_idVitima = idVitima";
        $query = "select idFoto, endereco_foto, fotos.legenda as legenda, fotos.nome as nomeRemetente, email, idVitima, vitimas.nome from fotos, vitimas where status=0 AND fotos.fk_idVitima = vitimas.idVitima order by idFoto desc";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function excluirFoto(){
        $query = "select endereco_foto from fotos where idFoto = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('id'));
        $stmt->execute();
        $endereco = $stmt->fetch(\PDO::FETCH_ASSOC);
        unlink("public/img/fotos_vitimas/".$endereco['endereco_foto']);

        $query = "delete from fotos where idFoto = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('id'));
        $stmt->execute();
    }

    public function aceitarFoto(){
        $query = "update fotos set status = 1 where idFoto = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('id'));
        $stmt->execute();
    }

    public function getFotosVitima(){
        $query = "select idFoto, endereco_foto, fotos.legenda, vitimas.nome, fk_idVitima from fotos, vitimas where status = 1 and fk_idVitima = :id and fk_idVitima = idVitima";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('idVitima'));
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function atualizarFoto(){
        $query = "update fotos set legenda = :tmp where idFoto = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('idFoto'));
        $stmt->bindValue(':tmp', $this->__get('legenda'));
        $stmt->execute();
        return $this->__get('legenda');
    }
}

?>