<?php //arquivo do gerenciamente produtos do adm
require 'conexao.php';
header("Access-Control-Allow-Origin: *"); //Permitindo acesso do servidor do React
header("Content-Type: application/json; charset=UTF-8"); //indica o tipo de arquivo que será enviado na resposta.
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); //define os métodos permitidos para esse endpoint que é o próprio caminho do arquivo.
header("Access-Control-Allow-Headers: Content-type, Authorization, X_Requested-With"); //permite envios personalizados no header, ou seja, permite envio de json no body na req.


//OBS: TODAS AS OPERAÇÕES QUE O ADM CONSEGUE FAZER COM PRODUTO ESTÃO AQUI: 

if (!isset($_SERVER['REQUEST_METHOD'])) {
    http_response_code(405);
    echo json_encode(["error" => "Tipo de requisição não reconhecida!"]);
    exit();
} else {
    $tipoReq = $_SERVER['REQUEST_METHOD']; //pega o tipo de requisição feita (GET, POST, PUT, DELETE)
    switch ($tipoReq) {
        case 'OPTIONS': //req padrão dos browsers para verificar os endpoints (suas regras etc)
            http_response_code(200); //resp 200 retorna ok pro browser
            exit();
            break;
        case 'GET': //select geral da home. Eu coloquei no arquivo errado kkkkk.
            try {
                $categ = $_GET['categ'] ?? null; //em gets eu pego pela url e no resto eu pego via corpo da requisição json
                $tipoBusca = $_GET['tipo']; //nome, categoria, preco?? uma ideia
                $ordemProdutos = $_GET['ordem']; //alfabetica, recente, antigo, caro, barato.....
                switch ($categ) {
                    case 'geral':
                        $query = $pdo->prepare('select * from produto');
                        $query->execute();
                        $resp = $query->fetchAll(PDO::FETCH_ASSOC); //params que deixa mais organizado
                        http_response_code(200);
                        echo json_encode(['sucesso' => true, 'data' => $resp]);
                        exit();
                        break;
                    default:
                        $query = $pdo->prepare('SELECT * FROM produto WHERE c.nm_categoria = ? JOIN Categoria c USING (id_categoria)');
                        $query->execute([$categ]);
                        $resp = $query->fetchAll(PDO::FETCH_ASSOC);
                        http_response_code(200);
                        echo json_encode(['sucesso' => true, 'data' => $resp]);
                        exit();
                        break;
                }
            } catch (PDOException $e) {
                echo json_encode(['error' => 'Erro inesperado na query!', 'debug' => $e->getMessage()]);
                exit();
            }
            break;
        case 'POST':
            $produto;
            if (empty($_POST)) {
                echo json_encode(['sucesso' => false, 'message' => 'Nada foi enviado no POST! Variável global inválida']);
                exit();
            } else {
                $produto = $_POST;
            }

            if (isset($produto["nome"]) && isset($produto["preco"]) && isset($produto["descricao"]) && isset($produto["tipo"]) && isset($produto["tamanho"]) && isset($produto["categoria"])) {
                try {
                    $imagens = [];
                    if (!isset($_FILES['fotos'])) {
                        echo json_encode(['sucesso' => false, 'message' => 'Foto não foi enviada!']);
                        exit();
                    } else {
                        $imagens = $_FILES['fotos'];
                        $caminho_completo = [];
                        for ($i = 0; $i < count($imagens['name']); $i++) {
                            if ($imagens['error'][$i] != UPLOAD_ERR_OK) {
                                echo json_encode(['sucesso' => false, 'message' => 'Upload da foto está com problemas: ' . $imagens['error'][$i]]);
                                exit();
                            } else {
                                $caminho = 'images/products/';
                                $nome_novo = uniqid() . '_' . $imagens['name'][$i];
                                $caminho_completo[$i] = $caminho . $nome_novo;
                                if (!move_uploaded_file($imagens['tmp_name'][$i], $caminho_completo[$i])) {
                                    echo json_encode(['sucesso' => false, 'message' => 'Erro ao mover imagem!']);
                                    exit();
                                }
                            }
                        }
                        $query1 = $pdo->prepare('SELECT id_categoria FROM categoria WHERE nm_categoria = ?');
                        $query1->execute([$produto["categoria"]]);
                        $categoria_row = $query1->fetch(PDO::FETCH_ASSOC);
                        if (!$categoria_row) {
                            echo json_encode(['sucesso' => false, 'message' => 'Categoria não encontrada!']);
                            exit();
                        }
                        $id_categoria = $categoria_row['id_categoria'];
                        $query2 = $pdo->prepare('INSERT INTO produto (nm_produto, preco, descricao, tipo, qt_tamanho, id_categoria) VALUES (?, ?, ?, ?, ?, ?)');
                        $query2->execute([$produto["nome"], (float)$produto["preco"], $produto["descricao"], $produto["tipo"], $produto["tamanho"], $id_categoria]);
                        if ($query2->rowCount() > 0) {
                            $id_produto = $pdo->lastInsertId();
                            for ($i = 0; $i < count($caminho_completo); $i++) {
                                $query3 = $pdo->prepare('insert into foto_produto (id_produto, caminho_foto) VALUES (?, ?);');
                                $query3->execute([$id_produto, $caminho_completo[$i]]);
                                if ($query3->rowCount() == 0) {
                                    http_response_code(400);
                                    echo json_encode(['sucesso' => false, 'message' => 'Imagem não conseguiu ser inserida!']);
                                    exit();
                                }
                            }
                            http_response_code(201);
                            echo json_encode(['sucesso' => true, 'message' => 'Imagem e produto inserida com sucesso!']);
                            exit();
                        } else {
                            http_response_code(400);
                            echo json_encode(['sucesso' => false, 'message' => 'Produto não pode ser inserido!']);
                            exit();
                        }
                    }
                } catch (PDOException $e) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Erro inesperado!!', 'debug' => $e->getMessage()]);
                    exit();
                }
            } else {
                http_response_code(400);
                echo json_encode(['sucesso' => false, 'message' => 'Dados de produto inválidos!']);
                exit();
            }
            break;

        case 'PUT':

            break;

        case 'DELETE':
            $id;
            $input_id = file_get_contents("php://input"); //pegando o valores dentro do body
            if (!isset($input_id)) {
                http_response_code(400);
                json_encode(['sucesso' => false, 'message' => 'Id não foi recebido!']);
                exit();
            } else {
                $id = json_decode($input_id, true);
            }
            if (isset($id)) {
                try {
                    $query = $pdo->prepare('select * from produto where id_produto = ?');
                    $query->execute([(int)$id["id"]]);
                    if (!$query->fetch()) { //preciso dar fetch pra n dar b.o
                        http_response_code(404);
                        echo json_encode(['sucesso' => false, ' message' => 'Produto inexistente! Não é possível excluir ele!']);
                        exit;
                    } else {
                        $query1 = $pdo->prepare('delete from produto where id_produto = ?;');
                        $query1->execute([(int)$id["id"]]);
                        if ($query1->rowCount() == 0) { //linhas afetadas
                            http_response_code(404); //recurso n encontrado kkk
                            echo json_encode(['sucesso' => false, 'message' => 'Nenhum produto encontrado para deletar!']);
                            exit();
                        } else { //só retorna rowCount uma vez pra n dar bug, pois essa bosta n funciona duas vezes.
                            $query2 = $pdo->prepare('delete from foto_produto where id_produto = ?;');
                            $query2->execute([(int)$id["id"]]);
                            http_response_code(200);
                            echo json_encode(['sucesso' => true, 'message' => 'Imagens e Produtos foram removidos!']);
                            exit();
                        }
                    }
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Erro encontrado!', 'debug' => $e->getMessage()]);
                    exit();
                }
            }
            break;
    }
}
