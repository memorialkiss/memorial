<?php

namespace App\Models;
use MF\Model\Model;

class Administrador extends Model {
    private $id;
    private $nome;
    private $email;
    private $senha;

    public function __get($atributo){
        return $this->$atributo;
    }

    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function autenticar(){
        $query = "select idAdmin, nome, e_mail from administrador where e_mail = :email and senha = :senha";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':email', $this->__get('email'));
        $stmt->bindValue(':senha', $this->__get('senha'));
        $stmt->execute();

        $usuario = $stmt->fetch(\PDO::FETCH_ASSOC);

        if($usuario['idAdmin'] != '' && $usuario['nome']) {
            $this->__set('id', $usuario['idAdmin']);
            $this->__set('nome', $usuario['nome']);

            $query = "insert into logLogin(nome) values(:nome)";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':nome', $usuario['nome']);
            $stmt->execute();
        }
        return $this;
    }
}

?>