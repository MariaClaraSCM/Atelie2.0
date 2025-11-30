<?php
header("Content-Type: application/json; charset=UTF-8");

$apache = true;
$mysql = false;
require_once "conexao.php"; 

// Se chegou aqui, significa que o PDO conectou sem cair no catch
$mysql = true;

echo json_encode([
    "apache" => $apache,
    "mysql" => $mysql
]);
