const db = require('../db/connection');

async function listarFornecedor(req, res) {
    try {
        const [rows] = await db.query(
            'SELECT * FROM fornecedor'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function criarFornecedor(req, res) {
    try {
        const { nome_fornecedor, cnpj, email } = req.body;

        if(!nome_fornecedor || !cnpj || !email) {
            return res.status(400).json({
                error: 'Nome, CNPJ e email são obrigatórios'
            });
        }

        await db.query(
            'INSERT INTO fornecedor (nome_fornecedor, cnpj, email) VALUES (?, ?, ?)', [nome_fornecedor, cnpj, email]
        );

        res.status(201).json({
            message: 'Fornecedor criado com sucesso'
        });
} catch (error) {
        res.status(500).json({ error: error.message });
    }  
}; 

module.exports = {
    listarFornecedor,
    criarFornecedor
};