const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./src/routes/usuario.routes');
const fornecedorRoutes = require('./src/routes/fornecedor.routes');
const produtoRoutes = require('./src/routes/produto.routes');
const estoqueRoutes = require('./src/routes/estoque.routes');
const produtoEstoqueRoutes = require('./src/routes/produtoEstoque.routes'); 
const movimentacaoEstoqueRoutes = require('./src/routes/movimentacaoEstoque.routes'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);    
app.use('/fornecedores', fornecedorRoutes);
app.use('/produtos', produtoRoutes)
app.use('/estoques', estoqueRoutes);
app.use('/produto_estoque', produtoEstoqueRoutes);
app.use('/movimentacao_estoque', movimentacaoEstoqueRoutes);

app.listen(3001, () => {
    console.log("API rodando na porta 3001")
});