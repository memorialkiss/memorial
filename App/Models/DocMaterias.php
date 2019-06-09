<?php

namespace App\Models;
use MF\Model\Model;

class DocMaterias extends Model {
    private $idMateria;
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

    public function adicionarDocMateria(){
        $query = 
            "insert into docMaterias(titulo, periodico, data, flagDesdobramento, flagVitima)". 
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

    public function getMaterias(){
        $query = "select * from docMaterias";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}