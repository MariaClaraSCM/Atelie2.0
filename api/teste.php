<?php
require_once "conexao.php";

// Supondo que o usuário seja 1 (teste)
$id_usuario = 2;

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

$stmt = $pdo->prepare($sql);
$stmt->bindValue(':id_usuario', $id_usuario, PDO::PARAM_INT);
$stmt->execute();

$itens = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($itens);
