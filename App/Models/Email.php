<?php

namespace App\Models;
use MF\Model\Model;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

class Email extends Model {
    private $nome = null;
    private $email = null;
    private $mensagem = null;
    private $status = null;

    public function __get($atributo) {
        return $this->$atributo;
    }

    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }
        
    public function mensagemValida() {
        if(empty($this->nome) || empty($this->email) || empty ($this->mensagem)){
            return false;
        }
        return true;
    }

    public function enviarEmail() {
        $mail = new PHPMailer(true);
        require "../privado/enviarEmail.phtml";
    }
}