<?php
require_once "conexao.php";

// ===== HEADERS =====
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Para pré-requisição OPTIONS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];

// ======================================
// GET — LISTAR PRODUTOS
// ======================================
if ($method === "GET") {
    try {
        $sql = $pdo->query("
    SELECT 
        p.id_produto, 
        p.nm_produto, 
        p.descricao, 
        p.preco, 
        p.tipo, 
        p.qt_tamanho,
        c.nm_categoria,
        GROUP_CONCAT(fp.caminho_foto SEPARATOR ',') AS fotos
    FROM produto p
    LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
    LEFT JOIN foto_produto fp ON fp.id_produto = p.id_produto
    GROUP BY p.id_produto
    ORDER BY p.id_produto DESC
");


        $produtos = $sql->fetchAll(PDO::FETCH_ASSOC);

        // 👉 URL BASE DO BACKEND (ajuste se necessário)
        $baseURL = "http://localhost/api/";

        // 👉 Transformar caminho da foto em URL válida
        foreach ($produtos as &$p) {
            if (!empty($p["fotos"])) {
                $fotosArray = explode(",", $p["fotos"]);
                $urls = [];

                foreach ($fotosArray as $foto) {
                    $urls[] = $baseURL . $foto;
                }

                $p["fotos"] = $urls;
            }
        }


        echo json_encode(["ok" => true, "produtos" => $produtos]);
        exit;
    } catch (Exception $e) {
        echo json_encode([
            "ok" => false,
            "erro" => $e->getMessage()
        ]);
        exit;
    }
}



// ======================================
// POST — CADASTRAR PRODUTO (FORMDATA)
// ======================================
if ($method === "POST") {

    // Validação de campos obrigatórios
    $campos = ["nome", "descricao", "preco", "tipo", "categoria"];
    foreach ($campos as $campo) {
        if (!isset($_POST[$campo]) || trim($_POST[$campo]) === "") {
            echo json_encode(["ok" => false, "erro" => "Campo obrigatório faltando: $campo"]);
            exit;
        }
    }

    $nome      = $_POST["nome"];
    $descricao = $_POST["descricao"];
    $preco     = floatval($_POST["preco"]);
    $tipo      = $_POST["tipo"];
    $categoria = intval($_POST["categoria"]);
    $tamanho   = $_POST["tamanho"] ?? "";

    try {
        // 1. Inserir produto
        $stmt = $pdo->prepare("
            INSERT INTO produto 
                (nm_produto, descricao, preco, tipo, qt_tamanho, id_categoria)
            VALUES (?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([$nome, $descricao, $preco, $tipo, $tamanho, $categoria]);

        $id_produto = $pdo->lastInsertId();

        // 2. Salvar fotos (se tiver)
        if (!empty($_FILES["fotos"]["name"][0])) {

            $pasta = "uploads/produtos/";
            if (!is_dir($pasta)) {
                mkdir($pasta, 0777, true);
            }

            foreach ($_FILES["fotos"]["tmp_name"] as $i => $tmpName) {

                $nomeOriginal = $_FILES["fotos"]["name"][$i];
                $novoNome = uniqid() . "_" . basename($nomeOriginal);
                $caminhoFinal = $pasta . $novoNome;

                move_uploaded_file($tmpName, $caminhoFinal);

                $fotoStmt = $pdo->prepare("
                    INSERT INTO foto_produto (id_produto, caminho_foto)
                    VALUES (?, ?)
                ");
                $fotoStmt->execute([$id_produto, $caminhoFinal]);
            }
        }

        echo json_encode(["ok" => true, "mensagem" => "Produto cadastrado com sucesso!"]);
        exit;
    } catch (Exception $e) {
        echo json_encode(["ok" => false, "erro" => $e->getMessage()]);
        exit;
    }
}


// ======================================
// MÉTODO NÃO PERMITIDO
// ======================================
http_response_code(405);
echo json_encode(["ok" => false, "erro" => "Método não suportado"]);
exit;
