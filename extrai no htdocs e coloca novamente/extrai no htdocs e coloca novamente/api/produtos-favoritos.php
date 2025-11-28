<?php
require 'conexao.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-type, Authorization, X_Requested-With");

if (!isset($_SERVER['REQUEST_METHOD'])) {
    http_response_code(405);
    echo json_encode(["error" => "Tipo de requisição inexistente!"]);
    exit();
} else {
    $tiporeq = $_SERVER['REQUEST_METHOD'];
    switch ($tiporeq) {
        case 'POST':
            $get_req = file_get_contents('php://input');
            if (empty($get_req)) {
                http_response_code(400);
                echo json_encode(['sucesso' => false, 'message' => 'Parâmetros enviados são inválidos / nulos.']);
                exit();
            } else {
                $req = json_decode($get_req, true);
                if ((int)$req['usuario'] > 0 && (int)$req['produto'] > 0) {
                    try {
                        $query1 = $pdo->prepare('select * from produto where id_produto = ?');
                        $query1->execute([(int)$req['produto']]);
                        $query2 = $pdo->prepare('select * from usuario where id_usuario = ?');
                        $query2->execute([(int)$req['usuario']]);
                        if ($query1->rowCount() == 0 || !$query2->fetch()) {
                            http_response_code(404);
                            echo json_encode(['sucesso' => false, 'message' => 'Produto ou usuário inexistentes!']);
                            exit();
                        } else {
                            $query3 = $pdo->prepare('select * from favoritos where id_usuario = ? and id_produto = ?');
                            $query3->execute([(int)$req['usuario'], (int)$req['produto']]);
                            if ($query3->fetch()) {
                                http_response_code(400);
                                echo json_encode(['sucesso' => false, 'message' => 'Registros duplicados!']);
                            } else {
                                $query4 = $pdo->prepare('insert into favoritos (id_usuario, id_produto) VALUES (?, ?);');
                                $query4->execute([(int)$req['usuario'], (int)$req['produto']]);
                                if (!$pdo->lastInsertId()) {
                                    http_response_code(400);
                                    echo json_encode(['sucesso' => false, 'message' => 'Algo deu errado na query!']);
                                    exit();
                                } else {
                                    http_response_code(201);
                                    echo json_encode(['sucesso' => true, 'message' => 'Produto favorito adicionado com sucesso!!!']);
                                    exit();
                                }
                            }
                        }
                    } catch (PDOException $e) {
                        http_response_code(500);
                        echo json_encode(['error' => 'Erro encontrado!', 'debug' => $e->getMessage()]);
                        exit();
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(['sucesso' => false, 'message' => 'IDs enviados são inválidos!']);
                }
            }
            break;
        case 'DELETE':

            break;
    }
}
