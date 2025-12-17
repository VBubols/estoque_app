-- Tabela de usuários
CREATE TABLE usuario(  
    id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nivel_acesso ENUM('admin', 'vendedor') NOT NULL DEFAULT 'vendedor',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de fornecedores
CREATE TABLE fornecedor(
    id_fornecedor INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_fornecedor VARCHAR(100) NOT NULL,
    cnpj CHAR(14),
    email VARCHAR(50) NOT NULL,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos
CREATE TABLE produto(
    id_produto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_produto VARCHAR(100) NOT NULL,
    categoria ENUM('Celular', 'Computador', 'Segurança', 'Outro') NOT NULL,
    preco DECIMAL(10, 2),
    id_fornecedor INT,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id_fornecedor)
);

-- Tabela de estoques
CREATE TABLE estoque(
    id_estoque INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_estoque VARCHAR(100) NOT NULL,
    localizacao VARCHAR(100) NOT NULL,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produto_estoque
CREATE TABLE produto_estoque(
    id_produto_estoque INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_estoque INT NOT NULL,
    id_produto INT NOT NULL,
    qtd_atual INT NOT NULL DEFAULT 0,
    qtd_reservada INT NOT NULL DEFAULT 0,
    data_ultima_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_estoque) REFERENCES estoque(id_estoque),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
    UNIQUE KEY unique_produto_estoque (id_estoque, id_produto)
);

-- Tabela de movimentação de estoque
CREATE TABLE movimentacao_estoque(
    id_movimentacao INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    data_movimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo_movimentacao ENUM('Entrada', 'Saída') NOT NULL,
    descricao VARCHAR(100),
    quantidade INT NOT NULL,
    id_produto_estoque INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_produto_estoque) REFERENCES produto_estoque(id_produto_estoque),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);