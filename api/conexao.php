<?php
// conexao.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$host='localhost';
$banco='db_atelie'; // Confirme que este banco existe
$usuario='root';    // Usuário padrão do XAMPP/WAMP
$senha='';          // Senha padrão do XAMPP/WAMP (geralmente vazia)

try {
    $pdo=new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
} catch(PDOException $e){
    throw $e;
    // Se a conexão falhar aqui, você verá o erro no lado do PHP.
    die("erro na conexão: ". $e->getMessage()); 
}
?>