const db = require('../db/connection');

async function listarProdutoEstoque(req, res) {
    try {
        const [rows] = await db.query(`
            SELECT 
                pe.id_produto_estoque,
                p.nome_produto,
                e.nome_estoque,
                pe.qtd_atual,
                pe.qtd_reservada,
                pe.data_ultima_atualizacao
            FROM produto_estoque pe
            JOIN produto p ON pe.id_produto = p.id_produto
            JOIN estoque e ON pe.id_estoque = e.id_estoque
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function criarProdutoEstoque(req, res) {
    const { id_produto, id_estoque, qtd_atual, qtd_reservada } = req.body;

    if (!id_produto || !id_estoque || qtd_atual == null || qtd_reservada == null) {
        return res.status(400).json({
            error: 'Todos os campos são obrigatórios'
        });
    }

    try {
        await db.query(
            `INSERT INTO produto_estoque 
            (id_produto, id_estoque, qtd_atual, qtd_reservada)
            VALUES (?, ?, ?, ?)`,
            [id_produto, id_estoque, qtd_atual, qtd_reservada]
        );

        res.status(201).json({ message: 'Produto vinculado ao estoque com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarQuantidade(req, res) {
    const { id } = req.params;
    const { qtd_atual, qtd_reservada } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE produto_estoque
            SET qtd_atual = ?, qtd_reservada = ?, data_ultima_atualizacao = CURRENT_TIMESTAMP
            WHERE id_produto_estoque = ?`,
            [qtd_atual, qtd_reservada, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro não encontrado' });
        }

        res.json({ message: 'Quantidade atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listarProdutoEstoque,
    criarProdutoEstoque,
    atualizarQuantidade
};
