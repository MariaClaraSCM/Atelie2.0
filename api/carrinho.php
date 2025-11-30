<?php
ob_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

require_once "conexao.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];

$dados = json_decode(file_get_contents("php://input"), true);

$id_produto = $dados['id_produto'] ?? null;
$quantidade = $dados['quantidade'] ?? 1;
$cor_item = $dados['cor_item'] ?? null;
$nm_personagem = $dados['nm_personagem'] ?? null;

// BUSCAR PRODUTO
function procurarDadosProduto($pdo, $id_produto) {
    $query = $pdo->prepare("SELECT * FROM produto WHERE id_produto = :id");
    $query->bindValue(":id", $id_produto, PDO::PARAM_INT);
    $query->execute();
    return $query->fetch(PDO::FETCH_ASSOC);
}

// INSERIR ITEM NO CARRINHO
function adicionarItemCarrinho($pdo, $id_carrinho, $id_produto, $quantidade, $cor_item, $nm_personagem, $preco_unitario) {
    $preco_total = $preco_unitario * $quantidade;
    $sql = "INSERT INTO item_carrinho (id_carrinho, id_produto, quantidade, cor_item, nm_personagem, preco_unitario, preco_total)
            VALUES (:id_carrinho, :id_produto, :quantidade, :cor_item, :nm_personagem, :preco_unitario, :preco_total)";

    $query = $pdo->prepare($sql);

    $query->bindValue(":id_carrinho", $id_carrinho, PDO::PARAM_INT);
    $query->bindValue(":id_produto", $id_produto, PDO::PARAM_INT);
    $query->bindValue(":quantidade", $quantidade, PDO::PARAM_INT);
    $query->bindValue(":cor_item", $cor_item);
    $query->bindValue(":nm_personagem", $nm_personagem);
    $query->bindValue(":preco_unitario", $preco_unitario);
    $query->bindValue(":preco_total", $preco_total);
    
    return $query->execute();
}

// $query = $pdo->query("SELECT * FROM item_carrinho ic JOIN ");
$id_usuario = 2; // FAZER LÓGICA DE CRIAR CARRINHO PARA AQUELE USUÁRIO
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
            SELECT fp.caminho_foto
            FROM foto_produto fp
            WHERE fp.id_produto = ic.id_produto
            ORDER BY fp.id_foto ASC
            LIMIT 1
        ) AS primeira_foto
        FROM item_carrinho ic
    INNER JOIN carrinho c ON c.id_carrinho = ic.id_carrinho
    INNER JOIN produto p ON p.id_produto = ic.id_produto
    WHERE c.id_usuario = :id_usuario
    ORDER BY ic.id_item_carrinho ASC
    ";

    $query = $pdo->prepare($sql);
    $query->bindValue(':id_usuario', $id_usuario, PDO::PARAM_INT);
    $query->execute();

    $itens = $query->fetchAll(PDO::FETCH_ASSOC);
    return $itens;
}

switch ($method) {
    case "GET":
        echo json_encode(exibirItensCarrinho($pdo, $id_usuario));
        exit;
    case "POST":
        if (!$id_produto) {
            echo json_encode(["erro" => "id_produto não enviado"]);
            exit;
        }

        // select das info do produto
        $produto = procurarDadosProduto($pdo, $id_produto);

        if (!$produto) {
            echo json_encode(["erro" => "Produto não encontrado"]);
            exit;
        }
        $preco_unitario = $produto["preco"];

        // Supondo carrinho fixo 1
        $id_carrinho = 1;

        $ok = adicionarItemCarrinho(
            $pdo,
            $id_carrinho,
            $id_produto,
            $quantidade,
            $cor_item,
            $nm_personagem,
            $preco_unitario
        );

        if ($ok) {
            echo json_encode([
                "ok" => true,
                "mensagem" => "Item adicionado ao carrinho",
                "produto" => $produto
            ]);
        } else {
            echo json_encode(["erro" => "Falha ao inserir item no carrinho"]);
        }

        exit;

    default:
        http_response_code(405);
        echo json_encode(["erro" => "Método não permitido"]);
        exit;
}