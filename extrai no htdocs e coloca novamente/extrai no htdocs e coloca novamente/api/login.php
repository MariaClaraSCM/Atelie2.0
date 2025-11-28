<?php
// usuarios.php (API de Login)
require_once 'conexao.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['email'], $input['senha'])) {
        echo json_encode(['sucesso' => false, 'erro' => 'Dados de login incompletos.']);
        exit;
    }

    $email = $input['email'];
    $senha = $input['senha'];

    try {
        // Busca o usuário pelo email
        $sql = "SELECT id_usuario, nm_usuario, email, senha, foto, tipo FROM usuario WHERE email = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$email]);
        $usuario = $query->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($senha, $usuario['senha'])) {
            // Login bem-sucedido. Retorna dados básicos do usuário (sem a senha).
            unset($usuario['senha']); // Remove a senha do objeto de resposta
            echo json_encode([
                'sucesso' => true,
                'mensagem' => 'Login realizado com sucesso!',
                'usuario' => $usuario
            ]);
        } else {
            // Credenciais inválidas (email não encontrado ou senha incorreta)
            echo json_encode(['sucesso' => false, 'erro' => 'E-mail ou senha incorretos.']);
        }

    } catch (\PDOException $e) {
        // Erro de banco de dados
        echo json_encode(['sucesso' => false, 'erro' => 'Erro interno ao processar o login.']);
    }
} else {
    // Resposta para métodos não permitidos
    echo json_encode(['sucesso' => false, 'erro' => 'Método não permitido.']);
}
?>