<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if (!isset($_SESSION["usuario"]["id_usuario"])) {
    echo json_encode(["ok" => false, "erro" => "Usuário não está logado"]);
    exit;
}

$id_usuario = $_SESSION["usuario"]["id_usuario"];
$method = $_SERVER["REQUEST_METHOD"];

// cria ou obtém o carrinho do usuário
function getCarrinhoId($pdo, $id_usuario) {
    $sql = "SELECT id_carrinho FROM carrinho WHERE id_usuario = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) return $row["id_carrinho"];

    $sql = "INSERT INTO carrinho (id_usuario) VALUES (?)";
    $stmt = $pdo->prepare($sql);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    return $stmt->insert_id;
}

$id_carrinho = getCarrinhoId($pdo, $id_usuario);

// listar itens do carrinho
if ($method === "GET") {
    $sql = "
        SELECT ic.id_item_carrinho, ic.id_produto, ic.quantidade, ic.cor_item, ic.nm_personagem,
               p.nm_produto, p.descricao, p.preco, p.fotos
        FROM item_carrinho ic
        JOIN produto p ON ic.id_produto = p.id_produto
        WHERE ic.id_carrinho = ?
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->bind_param("i", $id_carrinho);
    $stmt->execute();
    $result = $stmt->get_result();

    $itens = [];
    while ($row = $result->fetch_assoc()) {
        $row["fotos"] = json_decode($row["fotos"]);
        $itens[] = $row;
    }
    echo json_encode(["ok" => true, "data" => $itens]);
    exit;
}

// adicionar item ao carrinho
if ($method === "POST") {
    $json = json_decode(file_get_contents("php://input"), true);
    $id_produto = $json["id_produto"] ?? null;
    $quantidade = $json["quantidade"] ?? 1;
    $cor_item = $json["cor_item"] ?? null;
    $nm_personagem = $json["nm_personagem"] ?? null;

    if (!$id_produto) {
        echo json_encode(["ok" => false, "erro" => "Produto inválido"]);
        exit;
    }

    // Verifica se já existe o item com os mesmos atributos
    $sql = "SELECT id_item_carrinho FROM item_carrinho WHERE id_carrinho = ? AND id_produto = ? AND cor_item <=> ? AND nm_personagem <=> ?";
    $stmt = $pdo->prepare($sql);
    $stmt->bind_param("iiss", $id_carrinho, $id_produto, $cor_item, $nm_personagem);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        // aumenta quantidade
        $sql = "UPDATE item_carrinho SET quantidade = quantidade + ? WHERE id_item_carrinho = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bind_param("ii", $quantidade, $row["id_item_carrinho"]);
        $stmt->execute();
        echo json_encode(["ok" => true, "msg" => "Quantidade atualizada"]);
        exit;
    }

    // Insere novo item
    $sql = "INSERT INTO item_carrinho (id_carrinho, id_produto, quantidade, cor_item, nm_personagem) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->bind_param("iiiss", $id_carrinho, $id_produto, $quantidade, $cor_item, $nm_personagem);
    $stmt->execute();
    echo json_encode(["ok" => true, "msg" => "Item adicionado"]);
    exit;
}

// atualizar item do carrinho
if ($method === "PUT") {
    $json = json_decode(file_get_contents("php://input"), true);
    $id_item = $json["id_item_carrinho"] ?? null;
    $quantidade = $json["quantidade"] ?? null;
    $cor_item = $json["cor_item"] ?? null;
    $nm_personagem = $json["nm_personagem"] ?? null;

    if (!$id_item || !$quantidade) {
        echo json_encode(["ok" => false, "erro" => "Dados inválidos"]);
        exit;
    }

    $sql = "UPDATE item_carrinho SET quantidade = ?, cor_item = ?, nm_personagem = ? WHERE id_item_carrinho = ? AND id_carrinho = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->bind_param("issi", $quantidade, $cor_item, $nm_personagem, $id_item, $id_carrinho);
    $stmt->execute();

    echo json_encode(["ok" => true, "msg" => "Item atualizado"]);
    exit;
}

// deletar item do carrinho
if ($method === "DELETE") {
    $id_item = $_GET["id"] ?? null;
    if (!$id_item) {
        echo json_encode(["ok" => false, "erro" => "Item inválido"]);
        exit;
    }

    $sql = "DELETE FROM item_carrinho WHERE id_item_carrinho = ? AND id_carrinho = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->bind_param("ii", $id_item, $id_carrinho);
    $stmt->execute();

    echo json_encode(["ok" => true, "msg" => "Item removido"]);
    exit;
}

echo json_encode(["ok" => false, "erro" => "Método não suportado"]);
exit;
?>
