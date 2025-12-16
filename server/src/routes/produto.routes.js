const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produto.controller');

router.get('/', produtoController.listarProdutos);
router.post('/', produtoController.criarProduto);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.desativarProduto);
router.patch('/:id/reativar', produtoController.reativarProduto);

module.exports = router;