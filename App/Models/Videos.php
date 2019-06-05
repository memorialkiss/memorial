<?php

namespace App\Models;
use MF\Model\Model;

class Videos extends Model {
    private $idVideo;
    private $link;
    private $nome;
    private $descricao;
    private $status;
    private $fk_idVitima;

    public function __get($atributo){
        return $this->$atributo;
    }

    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function submeterVideo(){
        $query = "insert into videos (link, nome, descricao, status, fk_idVitima) values(:link, :nome, :descricao, 0, :fk)";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':link', $this->__get('link'));
        $stmt->bindValue(':nome', $this->__get('nome'));
        $stmt->bindValue(':descricao', $this->__get('descricao'));
        $stmt->bindValue(':fk', $this->__get('fk_idVitima'));
        $stmt->execute();
    }

    public function getVideosNaoAceitos(){
        $query = "select idVideo, link, vid.nome as nomeRemetente, vtm.nome as nomeVitima, vid.descricao, idVitima FROM videos as vid, vitimas as vtm WHERE vid.fk_idVitima = vtm.idVitima AND vid.status = 0 order by idVideo desc";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getContVideos(){
        $query = "select count(*) as contador from videos where status = 0";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function aceitarVideo(){
        $query = "update videos set status = 1 where idVideo = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('idVideo'));
        $stmt->execute();
    }

    public function rejeitarVideo(){
        $query = "delete from videos where idVideo = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('idVideo'));
        $stmt->execute();
    }

    public function getVideosVitima(){
        $query = "select idVideo, link FROM videos WHERE fk_idVitima = :id order by idVideo desc";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('fk_idVitima'));
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getVideosVitimaFull(){
        $query = "select idVideo, link, idVitima, videos.nome as nomeRemetente, vitimas.nome as nomeVitima, videos.descricao FROM videos, vitimas WHERE fk_idVitima = :id AND fk_idVitima = idVitima AND videos.status=1 order by idVideo desc";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $this->__get('fk_idVitima'));
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}