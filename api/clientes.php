<?php
require_once "conexao.php";

// ===== HEADERS =====
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Para pré-requisição OPTIONS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];

//GERA LISTA DE CLIENTES

if ($method === "GET") {
    try {
        $sql = $pdo->query("
            SELECT 
                id_usuario,
                nm_usuario,
                email,
                telefone
            FROM usuario
            ORDER BY nm_usuario ASC
        ");

        $clientes = $sql->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "ok" => true,
            "clientes" => $clientes
        ]);
        exit;

    } catch (Exception $e) {
        echo json_encode([
            "ok" => false,
            "erro" => $e->getMessage()
        ]);
        exit;
    }
}

//EXCLUI O CLIENTE

if ($method === "DELETE") {
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id_usuario'])) {
            echo json_encode([
                "ok" => false,
                "erro" => "ID do cliente não informado"
            ]);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM usuario WHERE id_usuario = ?");
        $stmt->execute([$data['id_usuario']]);

        echo json_encode([
            "ok" => true,
            "msg" => "Cliente excluído com sucesso"
        ]);
        exit;

    } catch (Exception $e) {
        echo json_encode([
            "ok" => false,
            "erro" => $e->getMessage()
        ]);
        exit;
    }
}
