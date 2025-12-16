const db = require('../db/connection');
const bcrypt = require('bcrypt');

async function listarUsusarios(req, res) {
    try {
        const [rows] = await db.query(
            'SELECT id_usuario, email, nivel_acesso FROM usuario'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function criarUsuario(req, res) {
    try {
        const { nome, email, senha, nivel_acesso } = req.body;

        if(!nome || !email || !senha || !nivel_acesso) {
            return res.status(400).json({
                error: 'Nome, email, senha e nível de acesso são obrigatórios'
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await db.query(
            'INSERT INTO usuario (nome, email, senha, nivel_acesso) VALUES (?, ?, ?, ?)', [nome, email, senhaHash, nivel_acesso]
        );

        res.status(201).json({
            message: 'Usuario criado com sucesso'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if(!email || !senha) {
            return res.status(400).json({
                error: 'Email e senha são obrigatórios'
            });
        }

        const [rows] = await db.query(
            'SELECT * FROM usuario WHERE email = ?', [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                error: 'Email ou senha inválidos.'
            });
        }

        const usuario = rows[0];

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if(!senhaValida) {
            return res.status(401).json({
                error: 'Email ou senha inválidos.'
            });
        }

        res.json({
            id: usuario.id_usuario,
            email: usuario.email,
            nivel_acesso: usuario.nivel_acesso
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listarUsusarios,
    criarUsuario,
    login
};