<?php
require "conexao.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$req = $_SERVER['REQUEST_METHOD'];

if (!$req) {
    http_response_code(400); //nenhuma requisição feita
    echo json_encode(['success' => false, 'message' => 'nenhuma requisição foi feita ou requisição indefinida!']);
    exit();
}

switch ($req) { //retornar usuarios

    case "GET":
        try {
            //recebe um query parameter:
            $buscar = $_GET['buscar'];
            if (!isset($buscar)) {
                http_response_code(400);
                json_encode(['success' => false, 'message' => 'Não foi definido se devemos buscar usuários ou pedidos!!!']);
                exit();
            } else if ($buscar  == 'pedido') {
            } else if ($buscar == 'usuario') {
                $query = $pdo->prepare('select * from usuario where tipo = user');
                $query->execute();
                if (empty($query)) {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Não existem usuários no banco de dados!']);
                    exit();
                } else {
                    http_response_code(200);
                    echo json_encode(['success' => true, 'usuarios' => $query->fetchAll(PDO::FETCH_ASSOC)]);
                    exit();
                    //fetch_assoc transforma em array associativo
                }
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro encontrado!!!', 'debug' => $e->getMessage()]);
            exit();
        }
        break;

    case "POST":
        try {
            $pedido = json_decode(file_get_contents("php://input"), true);

            if (!isset($pedido) || empty($pedido)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => "Dados enviados não foram corretamente recebidos!"]);
                exit();
            }

            // INICIA TRANSAÇÃO ( agrupa todos os inserts, usando junto para validar se um der b.o)
            $pdo->beginTransaction();

            // INSERE PEDIDO PRINCIPAL
            $query = $pdo->prepare("INSERT INTO pedido (dt_pedido, vl_total, metodo_pagamento, status_pedido, id_usuario) VALUES (?, ?, ?, ?, ?)");
            $query->execute([$pedido['data'], $pedido['total'], $pedido['metodo'], $pedido['status'], $pedido['user']]);

            $id_pedido = $pdo->lastInsertId();

            // INSERE ITENS DO PEDIDO
            foreach ($pedido['item_pedido'] as $item) {
                $query2 = $pdo->prepare('INSERT INTO item_pedido (id_pedido, id_produto, qt_item, cor_item, nm_personagem) VALUES (?, ?, ?, ?, ?)');
                $query2->execute([$id_pedido, $item['id'], $item['quantidade'], $item['cor'], $item['personagem']]);

                if ($query2->rowCount() == 0) {
                    throw new Exception('Um dos itens não pode ser adicionado!'); //lança excessão pra parar o código
                }
            }

            //Se der certo, salva às alterações
            $pdo->commit();

            http_response_code(201);
            echo json_encode(['success' => true, 'message' => 'Pedido criado com sucesso!', 'pedido_id' => $id_pedido]);
            exit();
        } catch (Exception $e) {
            if ($pdo->inTransaction()) { //verifica se está ocorrendo a transação.
                $pdo->rollBack(); //cancela os inserts por ter dado erro
            }

            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Erro encontrado!!!', 'debug' => $e->getMessage()]);
            exit();
        }
        break;

    case "PUT":
        $atualizarPedido = json_decode(file_get_contents("php://input"), true);
        if (!isset($atualizarPedido) || empty($atualizarPedido)) {
            http_response_code(400);
            json_encode(['success' => false, 'message' => 'Json vazio!!']);
            exit();
        }
        try {
            $query = $pdo->prepare('update pedido set dt_pedido = ?, vl_total = ?, metodo_pagamento = ?, status_pedido = ? where id_usuario = ?');
            $query->execute([$atualizarPedido['data'], $atualizarPedido['total'], $atualizarPedido['metodo'], $atualizarPedido['status'], $atualizarPedido['id']]);
            if ($query->rowCount() > 0) {
                foreach ($atualizarPedido['itens'] as $item) {
                    $query2 = $pdo->prepare('update item_pedido set id_item = ?, qt_item = ?, cor_item = ?, nm_personagem = ?');
                    $query2->execute([$item['id_item'], $item['quantidade'], $item['cor'], $item['personagem']]);
                    if ($query2->rowCount() == 0) {
                        http_response_code(404);
                        json_encode(['success' => false, 'message' => 'Item não encontrado!']);
                        exit();
                    }
                }
                http_response_code(200);
                json_encode(['success' => true, 'message' => 'Itens adicionados com sucesso!!!']);
                exit();
                //tenho que arrumar dps, mas fica assim por enquanto
            } else {
                http_response_code(404);
                json_encode(['success' => false, 'message' => 'Algo deu errado! Suas credenciais de pedido n funcionaram!']);
                exit();
            }
        } catch (PDOException $e) {
            http_response_code(500);
            json_encode(['error' => 'Algo deu errado!', 'debug' => $e->getMessage()]);
            exit();
        }
        break;

    case "DELETE":
        $id_pedido = $_GET['id_pedido'];
        if (!isset($id_pedido)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Query parameter inválido!']);
            exit();
        } else {
            try {
                $buscar_pedido = $pdo->prepare('select * from item_pedido where id_pedido = ?');
                $buscar_pedido->execute([$id_pedido]);
                $verificar = $buscar_pedido->fetchAll(PDO::FETCH_ASSOC);
                if (empty($verificar)) {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Nenhum pedido existente com este id!']);
                    exit();
                } else {
                    $query = $pdo->prepare('delete from item_pedido where id_pedido = ?');
                    $query->execute([$id_pedido]);
                    if ($query->rowCount() > 0) {
                        $query2 = $pdo->prepare('delete from pedido where id_pedido = ?');
                        $query2->execute([$id_pedido]);
                        if ($query2->rowCount() > 0) {
                            http_response_code(200);
                            echo json_encode(['success' => true, 'message' => 'Pedidos e seus itens excluídos com sucesso!']);
                            exit();
                        } else {
                            http_response_code(404);
                            echo json_encode(['success' => false, 'message' => 'Nenhum pedido foi encontrado!']);
                            exit();
                        }
                    } else {
                        http_response_code(404);
                        echo json_encode(['success' => false, 'message' => 'Nenhum item do pedido foi encontrado!']);
                        exit();
                    }
                }
            } catch (PDOException $e) {
            }
        }
        break;
}
