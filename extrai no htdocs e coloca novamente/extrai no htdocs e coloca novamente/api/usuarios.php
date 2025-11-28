<?php

require_once 'conexao.php';


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case 'POST': 
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';
        $senha = $input['senha'] ?? '';

      
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($senha, $user['senha'])) {
            unset($user['senha']);
            echo json_encode(['sucesso' => true, 'usuario' => $user]);
        } else {
            echo json_encode(['sucesso' => false, 'erro' => 'Credenciais inválidas']);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id_usuario'];

        try {
            $pdo->beginTransaction();
          
            $sqlUser = "UPDATE usuario SET nm_usuario=?, telefone=?, email=? WHERE id_usuario=?";
            $stmt = $pdo->prepare($sqlUser);
            $stmt->execute([$input['nm_usuario'], $input['telefone'], $input['email'], $id]);

            // Atualiza Endereço
            $sqlEnd = "UPDATE endereco SET rua=?, numero=?, bairro=?, cidade=?, estado=?, cep=? WHERE id_usuario=?";
            $stmtEnd = $pdo->prepare($sqlEnd);
            $stmtEnd->execute([$input['rua'], $input['numero'], $input['bairro'], $input['cidade'], $input['estado'], $input['cep'], $id]);

            $pdo->commit();
            echo json_encode(['sucesso' => true, 'mensagem' => 'Atualizado com sucesso']);
        } catch (Exception $e) {
            $pdo->rollBack();
            echo json_encode(['sucesso' => false, 'erro' => $e->getMessage()]);
        }
        break;

    case 'DELETE': // DELETE (Excluir conta)
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM usuario WHERE id_usuario = ?");
            if ($stmt->execute([$id])) {
                echo json_encode(['sucesso' => true]);
            } else {
                echo json_encode(['sucesso' => false, 'erro' => 'Erro ao deletar']);
            }
        }
        break;
}
?>
