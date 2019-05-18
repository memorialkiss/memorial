<?php

namespace App\Models;
use MF\Model\Model;

class Comentarios extends Model {
    private $id;
    private $nome;
    private $email;
    private $comentario;
    private $status;
    private $data;
    private $idVitima;

    public function __get($atributo){
        return $this->$atributo;
    }

    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function fazerComentario(){
        $query = "insert into comentarios(nome, comentario, email, status, fk_idVitima) values(:nome, :comentario, :email, 0, :id)";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':nome', $this->__get('nome'));
        $stmt->bindValue(':comentario', $this->__get('comentario'));
        $stmt->bindValue(':email', $this->__get('email'));
        $stmt->bindValue(':id', $this->__get('idVitima'));
        $stmt->execute();
        return $this;
    }

    //retorna todos os comentarios nao aprovados
    public function getComentariosAprovado(){
        $query = "select comentarios.nome as autor, comentario, data from comentarios where status = 1 AND fk_idVitima = :id order by idComentario desc";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('idVitima'));
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    //retorna todos os comentarios nao aprovados
    public function getComentariosNaoAprovado(){
        $query = "select idComentario, comentarios.nome as autor, email, comentario, data, vitimas.nome, fk_idVitima from comentarios, vitimas where fk_idVitima = idVitima AND status = 0 order by idComentario desc";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    //retorna quantidade de comentarios
    public function getContComentarios(){
        $query = "select count(*) as contador from comentarios where status = 0";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function excluirComentario(){
        $query = "delete from comentarios where idComentario = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('id'));
        $stmt->execute();
    }

    public function aceitarComentario(){
        $query = "update comentarios set status = 1 where idComentario = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('id'));
        $stmt->execute();
    }

    public function getComentariosPorPaginacao($inicio, $fim){
        $query = "select comentarios.nome as autor, comentario, data from comentarios where status = 1 AND fk_idVitima = :id order by idComentario desc limit {$inicio}, {$fim}";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('idVitima'));
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getContComentariosAceitos(){
        $query = "select count(*) as contador from comentarios where status = 1 and fk_idVitima = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('idVitima'));
        $stmt->execute();
        $quantidade = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $quantidade['contador'];
    }
}

?>