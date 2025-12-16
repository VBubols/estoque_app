const express = require('express');
const router = express.Router();
const produtoEstoqueController = require('../controllers/produtoEstoque.controller');

router.get('/', produtoEstoqueController.listarProdutoEstoque);
router.post('/', produtoEstoqueController.criarProdutoEstoque);
router.put('/:id', produtoEstoqueController.atualizarQuantidade);

module.exports = router;
