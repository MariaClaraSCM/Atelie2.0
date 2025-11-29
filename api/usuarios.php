<?php
require_once 'conexao.php';
session_start();

$origin = $_SERVER['HTTP_ORIGIN'] ?? 'http://localhost:5174';

header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

// Para pré-requisição OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // =========================
    // GET — usuário logado
    // =========================
    case 'GET':
        if (isset($_SESSION['usuario'])) {
            echo json_encode(['sucesso' => true, 'usuario' => $_SESSION['usuario']]);
        } else {
            echo json_encode(['sucesso' => false, 'erro' => 'Nenhum usuário logado']);
        }
        break;

    // =========================
    // POST — login
    // =========================
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';
        $senha = $input['senha'] ?? '';

        if (!$email || !$senha) {
            echo json_encode(['sucesso' => false, 'erro' => 'Email ou senha faltando']);
            exit;
        }

        $sql = "SELECT * FROM usuario WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($senha, $user['senha'])) {
            unset($user['senha']);
            $_SESSION['usuario'] = $user; // armazena usuário na sessão
            echo json_encode(['sucesso' => true, 'usuario' => $user]);
        } else {
            echo json_encode(['sucesso' => false, 'erro' => 'Credenciais inválidas']);
        }
        break;

    // =========================
    // PUT — atualizar usuário
    // =========================
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id_usuario'] ?? null;

        if (!$id) {
            echo json_encode(['sucesso' => false, 'erro' => 'ID do usuário não fornecido']);
            exit;
        }

        try {
            $pdo->beginTransaction();

            $sqlUser = "UPDATE usuario SET nm_usuario=?, telefone=?, email=? WHERE id_usuario=?";
            $stmt = $pdo->prepare($sqlUser);
            $stmt->execute([$input['nm_usuario'], $input['telefone'], $input['email'], $id]);

            // Atualiza endereço
            $sqlEnd = "UPDATE endereco SET rua=?, numero=?, bairro=?, cidade=?, estado=?, cep=? WHERE id_usuario=?";
            $stmtEnd = $pdo->prepare($sqlEnd);
            $stmtEnd->execute([$input['rua'], $input['numero'], $input['bairro'], $input['cidade'], $input['estado'], $input['cep'], $id]);

            $pdo->commit();
            echo json_encode(['sucesso' => true, 'mensagem' => 'Atualizado com sucesso']);

            // Atualiza sessão se for o mesmo usuário
            if (isset($_SESSION['usuario']) && $_SESSION['usuario']['id_usuario'] == $id) {
                $_SESSION['usuario'] = array_merge($_SESSION['usuario'], $input);
            }

        } catch (Exception $e) {
            $pdo->rollBack();
            echo json_encode(['sucesso' => false, 'erro' => $e->getMessage()]);
        }
        break;

    // =========================
    // DELETE — logout
    // =========================
    case 'DELETE':
        session_destroy();
        echo json_encode(['sucesso' => true, 'mensagem' => 'Usuário deslogado']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['sucesso' => false, 'erro' => 'Método não suportado']);
        break;
}
