const express = require('express');
const router = express.Router();
const movimentacaoController = require('../controllers/movimentacaoEstoque.controller');

router.get('/', movimentacaoController.listarMovimentacoes);
router.post('/', movimentacaoController.criarMovimentacao);

module.exports = router;
