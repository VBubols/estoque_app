const express = require('express');
const router = express.Router();    

const fornecedorController = require('../controllers/fornecedor.controller');

router.get('/', fornecedorController.listarFornecedor);
router.post('/', fornecedorController.criarFornecedor);

module.exports = router;
