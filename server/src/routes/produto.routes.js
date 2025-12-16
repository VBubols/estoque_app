const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produto.controller');

router.get('/', produtoController.listarProdutos);
router.post('/', produtoController.criarProduto);
router.put('/:id', produtoController.atualizarProduto);
router.put('/:id', produtoController.desativarProduto);

module.exports = router;