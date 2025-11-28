<?php
require 'conexao.php';
require 'conexao.php';
header("Access-Control-Allow-Origin: http://localhost:5173"); //Permitindo acesso do servidor do React
header("Content-Type: application/json; charset=UTF-8"); //indica o tipo de arquivo que será enviado na resposta.
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); //define os métodos permitidos para esse endpoint que é o próprio caminho do arquivo.
header("Access-Control-Allow-Headers: Content-type, Authorization, X_Requested-With"); //permite envios personalizados no header, ou seja, permite envio de jso no body na req.

//Arquivo dedicado à interação entre user e produto, ou seja, add produto no carrinho, no pedido, cancelar pedido etc............

$tipoReq = $_SERVER['REQUEST_METHOD'];
switch ($tipoReq) {
    case 'OPTIONS':
        http_response_code(200);
        exit;
        break;
    case 'POST':
        break;
    case 'PUT':
        break;
    case 'DELETE':
        break;
    default:
        break;
}
