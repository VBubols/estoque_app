const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoque.controller');

router.get('/', estoqueController.listarEstoques);
router.post('/', estoqueController.criarEstoque);

module.exports = router;
