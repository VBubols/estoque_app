const db = require('../db/connection');

async function listarMovimentacoes(req, res) {
    try {
        const [rows] = await db.query(`
            SELECT 
                me.id_movimentacao,
                me.data_movimentacao,
                me.tipo_movimentacao,
                me.descricao,
                me.quantidade,
                u.email AS usuario
            FROM movimentacao_estoque me
            JOIN usuario u ON me.id_usuario = u.id_usuario
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function criarMovimentacao(req, res) {
    const { tipo_movimentacao, descricao, quantidade, id_produto_estoque, id_usuario } = req.body;

    if (!tipo_movimentacao || !quantidade || !id_produto_estoque || !id_usuario) {
        return res.status(400).json({
            error: 'Campos obrigatórios não informados'
        });
    }

    try {
        await db.query(
            `INSERT INTO movimentacao_estoque 
            (tipo_movimentacao, descricao, quantidade, id_produto_estoque, id_usuario)
            VALUES (?, ?, ?, ?, ?)`,
            [tipo_movimentacao, descricao || null, quantidade, id_produto_estoque, id_usuario]
        );

        res.status(201).json({ message: 'Movimentação registrada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listarMovimentacoes,
    criarMovimentacao
};
