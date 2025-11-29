<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Permitir OPTIONS rápido
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "conexao.php"; // garante que $pdo exista (ajuste caminho se necessário)

// método
$method = $_SERVER['REQUEST_METHOD'];

// ---------- GET: listar ----------
if ($method === 'GET') {
    try {
        $stmt = $pdo->prepare("SELECT id_categoria, nm_categoria FROM categoria ORDER BY 2");
        $stmt->execute();
        $cats = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["categorias" => $cats]); // <- AQUI ARRUMADO

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["erro" => "Erro ao buscar categorias"]);
    }
    exit;
}


// ---------- POST: criar ----------
if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['nm_categoria']) || trim($data['nm_categoria']) === '') {
        http_response_code(400);
        echo json_encode(["erro" => "Nome da categoria é obrigatório"]);
        exit;
    }

    $nome = trim($data['nm_categoria']);

    try {
        // checar duplicado
        $chk = $pdo->prepare("SELECT id_categoria FROM categoria WHERE nm_categoria = ?");
        $chk->execute([$nome]);
        if ($chk->rowCount() > 0) {
            http_response_code(409);
            echo json_encode(["erro" => "Categoria já existe"]);
            exit;
        }

        $ins = $pdo->prepare("INSERT INTO categoria (nm_categoria) VALUES (?)");
        $ins->execute([$nome]);

        echo json_encode(["mensagem" => "Categoria cadastrada com sucesso", "id" => $pdo->lastInsertId()]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["erro" => "Erro ao cadastrar categoria"]);
    }
    exit;
}

// ---------- PUT: editar ----------
if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id_categoria']) || !isset($data['nm_categoria'])) {
        http_response_code(400);
        echo json_encode(["erro" => "Dados incompletos"]);
        exit;
    }

    $id = intval($data['id_categoria']);
    $nome = trim($data['nm_categoria']);

    try {
        $upd = $pdo->prepare("UPDATE categoria SET nm_categoria = ? WHERE id_categoria = ?");
        $upd->execute([$nome, $id]);

        echo json_encode(["mensagem" => "Categoria atualizada com sucesso"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["erro" => "Erro ao atualizar categoria"]);
    }
    exit;
}

// ---------- DELETE: excluir ----------
if ($method === 'DELETE') {
    // vamos aceitar id via query param ?id=...
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["erro" => "ID não informado"]);
        exit;
    }

    $id = intval($_GET['id']);

    try {
        $del = $pdo->prepare("DELETE FROM categoria WHERE id_categoria = ?");
        $del->execute([$id]);

        echo json_encode(["mensagem" => "Categoria excluída com sucesso"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["erro" => "Erro ao excluir categoria"]);
    }
    exit;
}

http_response_code(405);
echo json_encode(["erro" => "Método não permitido"]);
