-- ================================================
-- DADOS DE EXEMPLO - FORNECEDORES
-- ================================================

INSERT INTO fornecedor (nome_fornecedor, cnpj, email) VALUES
('Tech Solutions Ltda', '12345678000190', 'contato@techsolutions.com.br'),
('Eletrônicos Silva', '98765432000123', 'vendas@eletrosilva.com.br'),
('Distribuidora TecnoMax', '45678912000156', 'comercial@tecnomix.com.br'),
('ImportComp Brasil', '78945612000189', 'pedidos@importcomp.com.br'),
('Segurança Total', '32165498000145', 'atendimento@segurancatotal.com.br');

-- ================================================
-- DADOS DE EXEMPLO - PRODUTOS
-- ================================================

-- Produtos da categoria Celular
INSERT INTO produto (nome_produto, categoria, preco, id_fornecedor) VALUES
('iPhone 15 Pro', 'Celular', 7999.00, 1),
('Samsung Galaxy S24', 'Celular', 5499.00, 1),
('Xiaomi Redmi Note 13', 'Celular', 1899.00, 2),
('Motorola Edge 40', 'Celular', 2799.00, 2),
('iPhone 14', 'Celular', 5999.00, 4);

-- Produtos da categoria Computador
INSERT INTO produto (nome_produto, categoria, preco, id_fornecedor) VALUES
('MacBook Pro M3', 'Computador', 12999.00, 1),
('Dell Inspiron 15', 'Computador', 3499.00, 3),
('Lenovo ThinkPad X1', 'Computador', 8999.00, 3),
('HP Pavilion Gaming', 'Computador', 4599.00, 2),
('Asus ROG Strix', 'Computador', 9999.00, 4);

-- Produtos da categoria Segurança
INSERT INTO produto (nome_produto, categoria, preco, id_fornecedor) VALUES
('Câmera IP WiFi 1080p', 'Segurança', 299.00, 5),
('Sistema de Alarme Residencial', 'Segurança', 899.00, 5),
('Fechadura Digital Biométrica', 'Segurança', 599.00, 5),
('Kit DVR 8 Canais + 4 Câmeras', 'Segurança', 1499.00, 5),
('Sensor de Presença Infravermelho', 'Segurança', 89.00, 5);

-- Produtos da categoria Outro
INSERT INTO produto (nome_produto, categoria, preco, id_fornecedor) VALUES
('Mouse Logitech MX Master 3', 'Outro', 499.00, 3),
('Teclado Mecânico RGB', 'Outro', 399.00, 3),
('Fone de Ouvido Bluetooth JBL', 'Outro', 299.00, 2),
('Webcam Full HD 1080p', 'Outro', 249.00, 4),
('Monitor LG 27" 4K', 'Outro', 1899.00, 1);