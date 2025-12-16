const db = require('../db/connection');

async function listarEstoques(req, res) {
    try {
        const [rows] = await db.query(
            'SELECT * FROM estoque'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function criarEstoque(req, res) {
    const { nome_estoque, localizacao } = req.body;

    if (!nome_estoque || !localizacao) {
        return res.status(400).json({
            error: 'Nome do estoque e localização são obrigatórios'
        });
    }

    try {
        await db.query(
            'INSERT INTO estoque (nome_estoque, localizacao) VALUES (?, ?)',
            [nome_estoque, localizacao]
        );

        res.status(201).json({ message: 'Estoque criado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listarEstoques,
    criarEstoque
};
