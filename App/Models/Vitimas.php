<?php

namespace App\Models;
use MF\Model\Model;

class Vitimas extends Model {
    private $id;
    private $nome;
    private $foto_perfil;
    private $descricao;
    private $idade;
    private $legenda;
    private $cidade;
    private $status;
    private $sexo;

    public function __get($atributo){
        return $this->$atributo;
    }

    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function getAllSimplicified(){ 
        $query = "select idVitima, nome, foto_perfil from vitimas";
        $stmt = $this->db->prepare($query);
        $stmt->execute(); 
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getAllDashboard(){ 
        $query = "select idVitima, nome from vitimas";
        $stmt = $this->db->prepare($query);
        $stmt->execute(); 
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getVitima(){
        $query = "select idVitima, nome, foto_perfil, descricao, idade, legenda, cidade, estado, sexo from vitimas where idVitima = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('id'));
        $stmt->execute(); 
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function atualizarVitima(){
        $query = "update vitimas set ";
        
        $query = $query." nome = :nome";
        if($this->__get('descricao') != '') $query = $query.", descricao = :descricao";
        if($this->__get('legenda') != '') $query = $query.", legenda = :legenda";
        if($this->__get('cidade') != '') $query = $query.", cidade = :cidade";
        if($this->__get('idade') != '') $query = $query.", idade = :idade";
        
        $query = $query.", estado = :status";
        $query = $query." where idVitima = :id";

        $stmt = $this->db->prepare($query);

        if($this->__get('nome') != '') $stmt->bindValue(':nome', $this->__get('nome'));
        if($this->__get('descricao') != '') $stmt->bindValue(':descricao', $this->__get('descricao'));
        if($this->__get('legenda') != '') $stmt->bindValue(':legenda', $this->__get('legenda'));  
        if($this->__get('cidade') != '') $stmt->bindValue(':cidade', $this->__get('cidade'));
        if($this->__get('idade') != '') $stmt->bindValue(':idade', $this->__get('idade'));

        $stmt->bindValue(':status', $this->__get('status'));
        $stmt->bindValue(':id', $this->__get('id'));
        $stmt->execute();
    }
}

?>