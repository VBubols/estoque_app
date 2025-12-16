const db = require('../db/connection');

async function listarProdutos(req, res) {
    try {
        const [rows] = await db.query(
            'SELECT * FROM produto WHERE ativo = true'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function criarProduto(req, res) {
    try {
        const { nome_produto, categoria, preco, id_fornecedor } = req.body;

        if(!nome_produto || !categoria || !preco || !id_fornecedor) {
            return res.status(400).json({
                error: 'Nome do produto, categoria, preço e ID do fornecedor são obrigatórios'
            });
        }

        await db.query(
            'INSERT INTO produto (nome_produto, categoria, preco, id_fornecedor) VALUES (?, ?, ?, ?)', [nome_produto, categoria, preco, id_fornecedor]
        );

        res.status(201).json({
            message: 'Produto criado com sucesso'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function atualizarProduto(req, res) {
    const { id } = req.params;
    const { nome_produto, categoria, preco, id_fornecedor } = req.body;

    try{
        const [result] = await db.query(
            'UPDATE produto SET nome_produto = ?, categoria = ?, preco = ?, id_fornecedor = ? WHERE id_produto = ?', 
            [nome_produto, categoria, preco, id_fornecedor || null, id]
        );    

        if(result.affectedRows === 0){
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function desativarProduto(req, res) {
    const { id } = req.params;

    try { 
        const [result] = await db.query(
            'UPDATE produto SET ativo = false WHERE id_produto = ?', [id]
        );

        if(result.affectedRows === 0){
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        return res.json({ message: 'Produto desativado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    desativarProduto
};