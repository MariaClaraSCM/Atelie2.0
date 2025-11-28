<?php
require 'conexao.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ===== Impede qualquer string que quebre seu JSON =====
error_reporting(0);
ini_set('display_errors', 0);
ob_clean();

// Resposta automática p/ requisições OPTIONS (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Recebe JSON do React
    $input = json_decode(file_get_contents('php://input'), true);

    // Valida campos obrigatórios
    if (
        !isset($input['email'], $input['senha'], $input['nm_usuario'], $input['cpf'], 
               $input['dt_nascimento'], $input['telefone'])
    ) {
        echo json_encode([
            'sucesso' => false, 
            'erro' => 'Dados de cadastro incompletos.'
        ]);
        exit;
    }

    // Cria hash seguro da senha
    $senha_hash = password_hash($input['senha'], PASSWORD_DEFAULT);

    try {
        $pdo->beginTransaction();

        // INSERT no banco
        $sql = "INSERT INTO usuario 
            (nm_usuario, cpf, dt_nascimento, telefone, email, senha, foto, tipo) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'user')";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['nm_usuario'],
            $input['cpf'],
            $input['dt_nascimento'],
            $input['telefone'],
            $input['email'],
            $senha_hash,
            $input['foto'] ?? null
        ]);

        $id_usuario = $pdo->lastInsertId();

        $pdo->commit();

        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Cadastro realizado com sucesso!',
            'id_usuario' => $id_usuario
        ]);
        exit;

    } catch (PDOException $e) {

        $pdo->rollBack();

        // Aqui você pode melhorar depois
        echo json_encode([
            'sucesso' => false,
            'erro' => 'Erro no cadastro: E-mail ou CPF já registrados.'
        ]);
        exit;
    }
}
?>
