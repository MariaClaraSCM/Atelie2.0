<?php
ob_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

session_start();
require_once "conexao.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];
$dados  = json_decode(file_get_contents("php://input"), true);

function verificarLogin() {
    if (!isset($_SESSION["id_usuario"]) || empty($_SESSION["id_usuario"])) {
        echo json_encode(["erro" => "Usuário não logado. Faça login para continuar."]);
        http_response_code(401);
        exit;
    }
}

function buscarCarrinhoUsuario($pdo, $id_usuario) {
    $sql = "SELECT id_carrinho FROM carrinho WHERE id_usuario = :id LIMIT 1";
    $q = $pdo->prepare($sql);
    $q->bindValue(":id", $id_usuario);
    $q->execute();
    return $q->fetchColumn();
}

function criarCarrinhoUsuario($pdo, $id_usuario) {
    $sql = "INSERT INTO carrinho (id_usuario) VALUES (:id)";
    $q = $pdo->prepare($sql);
    $q->bindValue(":id", $id_usuario);
    $q->execute();
    return $pdo->lastInsertId();
}

function obterCarrinho($pdo, $id_usuario) {
    $id = buscarCarrinhoUsuario($pdo, $id_usuario);
    if ($id) return $id;
    return criarCarrinhoUsuario($pdo, $id_usuario);
}

function procurarDadosProduto($pdo, $id_produto) {
    $query = $pdo->prepare("SELECT * FROM produto WHERE id_produto = :id");
    $query->bindValue(":id", $id_produto, PDO::PARAM_INT);
    $query->execute();
    return $query->fetch(PDO::FETCH_ASSOC);
}

function exibirItensCarrinho($pdo, $id_usuario) {
    $sql = "
        SELECT 
            ic.id_item_carrinho,
            ic.id_carrinho,
            ic.id_produto,
            ic.quantidade,
            ic.cor_item,
            ic.nm_personagem,
            ic.preco_unitario,
            ic.preco_total,
            p.nm_produto AS nome_produto,
            p.descricao AS descricao_produto,
            (
                SELECT CONCAT('http://localhost/api/uploads/produtos/', 
                              REPLACE(fp.caminho_foto, 'uploads/produtos/', ''))
                FROM foto_produto fp
                WHERE fp.id_produto = ic.id_produto
                ORDER BY fp.id_foto ASC LIMIT 1
            ) AS primeira_foto
        FROM item_carrinho ic
        INNER JOIN carrinho c ON c.id_carrinho = ic.id_carrinho
        INNER JOIN produto p ON p.id_produto = ic.id_produto
        WHERE c.id_usuario = :id_usuario
        ORDER BY ic.id_item_carrinho ASC
    ";

    $query = $pdo->prepare($sql);
    $query->bindValue(":id_usuario", $id_usuario);
    $query->execute();

    return $query->fetchAll(PDO::FETCH_ASSOC);
}

function procurarItemExistente($pdo, $id_carrinho, $id_produto, $cor_item, $nm_personagem) {
    $sql = "SELECT *
            FROM item_carrinho
            WHERE id_carrinho = :id_carrinho
              AND id_produto = :id_produto
              AND (cor_item <=> :cor_item)
              AND (nm_personagem <=> :nm_personagem)
            LIMIT 1";

    $query = $pdo->prepare($sql);
    $query->bindValue(":id_carrinho", $id_carrinho);
    $query->bindValue(":id_produto", $id_produto);
    $query->bindValue(":cor_item", $cor_item);
    $query->bindValue(":nm_personagem", $nm_personagem);
    $query->execute();

    return $query->fetch(PDO::FETCH_ASSOC);
}

function adicionarItemCarrinho($pdo, $id_carrinho, $id_produto, $quantidade, $cor_item, $nm_personagem, $preco_unitario) {
    $preco_total = $preco_unitario * $quantidade;

    $sql = "INSERT INTO item_carrinho
            (id_carrinho, id_produto, quantidade, cor_item, nm_personagem, preco_unitario, preco_total)
            VALUES (:id_carrinho, :id_produto, :quantidade, :cor_item, :nm_personagem, :preco_unitario, :preco_total)";

    $query = $pdo->prepare($sql);
    $query->bindValue(":id_carrinho", $id_carrinho);
    $query->bindValue(":id_produto", $id_produto);
    $query->bindValue(":quantidade", $quantidade);
    $query->bindValue(":cor_item", $cor_item);
    $query->bindValue(":nm_personagem", $nm_personagem);
    $query->bindValue(":preco_unitario", $preco_unitario);
    $query->bindValue(":preco_total", $preco_total);

    return $query->execute();
}


verificarLogin();
$id_usuario  = $_SESSION["id_usuario"];
$id_carrinho = obterCarrinho($pdo, $id_usuario);

$id_produto    = $dados['id_produto'] ?? null;
$quantidade    = $dados['quantidade'] ?? 1;
$cor_item      = $dados['cor_item'] ?? null;
$nm_personagem = $dados['nm_personagem'] ?? null;

switch ($method) {
    case "GET":
        echo json_encode(exibirItensCarrinho($pdo, $id_usuario));
        exit;

    case "POST":
        if (!$id_produto) {
            echo json_encode(["erro" => "id_produto não enviado"]);
            exit;
        }

        $produto = procurarDadosProduto($pdo, $id_produto);
        if (!$produto) {
            echo json_encode(["erro" => "Produto não encontrado"]);
            exit;
        }

        $preco_unitario = $produto["preco"];

        $itemExistente = procurarItemExistente($pdo, $id_carrinho, $id_produto, $cor_item, $nm_personagem);

        if ($itemExistente) {
            $novaQtd    = $itemExistente["quantidade"] + $quantidade;
            $novoPreco  = $novaQtd * $preco_unitario;

            $sql = "UPDATE item_carrinho SET quantidade = ?, preco_total = ? WHERE id_item_carrinho = ?";
            $up  = $pdo->prepare($sql);
            $up->execute([$novaQtd, $novoPreco, $itemExistente["id_item_carrinho"]]);

            echo json_encode([
                "ok" => true,
                "mensagem" => "Quantidade atualizada",
                "id_item" => $itemExistente["id_item_carrinho"],
                "quantidade" => $novaQtd
            ]);
            exit;
        }

        $ok = adicionarItemCarrinho($pdo, $id_carrinho, $id_produto, $quantidade, $cor_item, $nm_personagem, $preco_unitario);

        echo json_encode($ok ? ["ok" => true] : ["erro" => "Falha ao inserir"]);
        exit;


    case "PUT":
        if (!isset($dados["id_item_carrinho"]) || !isset($dados["quantidade"])) {
            echo json_encode(["erro" => "Dados incompletos"]);
            exit;
        }

        $id_item = $dados["id_item_carrinho"];
        $nova_qtd = max(1, intval($dados["quantidade"]));

        $stmt = $pdo->prepare("SELECT preco_unitario FROM item_carrinho WHERE id_item_carrinho = ?");
        $stmt->execute([$id_item]);

        $preco_unitario = $stmt->fetchColumn();
        if (!$preco_unitario) {
            echo json_encode(["erro" => "Item não encontrado"]);
            exit;
        }

        $preco_total = $preco_unitario * $nova_qtd;

        $stmt = $pdo->prepare("UPDATE item_carrinho SET quantidade = ?, preco_total = ? WHERE id_item_carrinho = ?");
        $stmt->execute([$nova_qtd, $preco_total, $id_item]);

        echo json_encode(["sucesso" => true]);
        exit;


    case "DELETE":
        if (!isset($_GET["id"])) {
            echo json_encode(["erro" => "ID não informado"]);
            exit;
        }

        $id = intval($_GET["id"]);

        $stmt = $pdo->prepare("DELETE FROM item_carrinho WHERE id_item_carrinho = ?");
        $stmt->execute([$id]);

        echo json_encode(["sucesso" => true]);
        exit;


    default:
        http_response_code(405);
        echo json_encode(["erro" => "Método não permitido"]);
        exit;
}
