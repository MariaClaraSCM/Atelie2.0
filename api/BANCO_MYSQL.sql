CREATE DATABASE IF NOT EXISTS db_atelie;
USE db_atelie;

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nm_usuario VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    dt_nascimento DATE NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto VARCHAR(255) DEFAULT NULL,
    tipo ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    rua VARCHAR(100) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    cep CHAR(8) NOT NULL,
    numero VARCHAR(10),
    complemento VARCHAR(50),
    logradouro VARCHAR(50),
    id_usuario INT NOT NULL,

    CONSTRAINT fk_endereco_usuario
        FOREIGN KEY (id_usuario)
            REFERENCES usuario(id_usuario)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nm_categoria VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nm_produto VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    descricao VARCHAR(500),
    tipo ENUM('Pronta entrega', 'Encomenda') NOT NULL,
    qt_tamanho VARCHAR(20),
    id_categoria INT NOT NULL,

    CONSTRAINT fk_produto_categoria
        FOREIGN KEY (id_categoria)
            REFERENCES categoria(id_categoria)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS foto_produto (
    id_foto INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    caminho_foto VARCHAR(255) NOT NULL,

    CONSTRAINT fk_foto_produto
        FOREIGN KEY (id_produto)
        REFERENCES produto(id_produto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS carrinho (
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,

    CONSTRAINT fk_carrinho_usuario
        FOREIGN KEY (id_usuario)
            REFERENCES usuario(id_usuario)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS item_carrinho (
    id_item_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    id_carrinho INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT DEFAULT 1,
    cor_item VARCHAR(50),
    nm_personagem VARCHAR(255),

    CONSTRAINT fk_item_carrinho_carrinho
        FOREIGN KEY (id_carrinho)
            REFERENCES carrinho(id_carrinho)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

    CONSTRAINT fk_item_carrinho_produto
        FOREIGN KEY (id_produto)
            REFERENCES produto(id_produto)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS favoritos (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_produto INT NOT NULL,

    CONSTRAINT fk_favoritos_usuario
        FOREIGN KEY (id_usuario)
            REFERENCES usuario(id_usuario)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

    CONSTRAINT fk_favoritos_produto
        FOREIGN KEY (id_produto)
            REFERENCES produto(id_produto)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    dt_pedido DATETIME NOT NULL,
    vl_total DECIMAL(10,2),
    metodo_pagamento VARCHAR(120),
    status_pedido ENUM('Pendente', 'Em andamento', 'Concluído', 'A caminho', 'Entregue', 'Cancelado') NOT NULL DEFAULT 'Pendente',
    id_usuario INT NOT NULL,

    CONSTRAINT fk_pedido_usuario
        FOREIGN KEY (id_usuario)
            REFERENCES usuario(id_usuario)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS item_pedido (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    qt_item INT DEFAULT 1,
    cor_item VARCHAR(50),
    nm_personagem VARCHAR(255),

    CONSTRAINT fk_item_pedido_pedido
        FOREIGN KEY (id_pedido)
            REFERENCES pedido(id_pedido)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

    CONSTRAINT fk_item_pedido_produto
        FOREIGN KEY (id_produto)
            REFERENCES produto(id_produto)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS historico_pedidos (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    status_anterior VARCHAR(50),
    status_novo VARCHAR(50),
    dt_alteracao DATETIME NOT NULL,

    CONSTRAINT fk_historico_pedido
        FOREIGN KEY (id_pedido)
            REFERENCES pedido(id_pedido)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS avaliacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    estrelas INT NOT NULL,
    comentario TEXT NOT NULL
);
