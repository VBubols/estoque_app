# 📦 Sistema de Gerenciamento de Estoque

> Aplicativo mobile para controle de estoque, produtos e fornecedores desenvolvido com React Native (Expo) e Node.js

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## 📋 Sobre o Projeto

Sistema completo de gerenciamento de estoque que permite:

- 👤 **Autenticação de usuários** com níveis de acesso (Admin/Vendedor)
- 📦 **CRUD de Produtos** com categorias e preços
- 🏢 **Gerenciamento de Fornecedores** com dados completos
- 📊 **Controle de Estoque** com entrada e saída de produtos
- 📈 **Movimentações** com histórico completo

## 🚀 Tecnologias Utilizadas

### Frontend (Mobile)
- **React Native** com **Expo Router**
- **TypeScript** para tipagem estática
- **Axios** para requisições HTTP
- **React Navigation** para navegação entre telas
- **Expo Go** para testes em desenvolvimento

### Backend (API)
- **Node.js** com **Express**
- **MySQL** para banco de dados
- **bcrypt** para criptografia de senhas
- **CORS** habilitado para requisições cross-origin

## 📁 Estrutura do Projeto

```
estoque_app/
├── client/                    # Aplicativo Mobile (React Native)
│   ├── app/                  # Telas do aplicativo
│   │   ├── _layout.tsx       # Layout principal
│   │   ├── login.tsx         # Tela de login
│   │   ├── cadastro.tsx      # Tela de cadastro
│   │   ├── produtos.tsx      # CRUD de produtos
│   │   ├── fornecedores.tsx  # CRUD de fornecedores
│   │   └── estoque.tsx       # Gerenciamento de estoque
│   ├── components/           # Componentes reutilizáveis
│   ├── services/            # Configuração de API
│   ├── types/               # Tipos TypeScript
│   └── package.json
│
├── server/                   # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── routes/          # Rotas da API
│   │   ├── db/              # Configuração do banco
│   │   └── middlewares/     # Middlewares
│   ├── index.js             # Entrada do servidor
│   └── package.json
│
├── database/                 # Scripts SQL
│   ├── schema.sql           # Estrutura do banco
│   └── seed.sql             # Dados de exemplo
│
└── README.md
```

## 🔧 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [MySQL](https://www.mysql.com/) (v8 ou superior)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/client) no celular (para testes)

## 🎯 Instalação e Configuração

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/VBubols/estoque_app.git
cd estoque_app
```

### 2️⃣ Configure o Banco de Dados

```bash
# Entre no MySQL
mysql -u root -p

# Crie o banco de dados
CREATE DATABASE estoque_db;
USE estoque_db;

# Execute o script de estrutura
source database/schema.sql;

# (Opcional) Popule com dados de exemplo
source database/seed.sql;
```

### 3️⃣ Configure o Backend

```bash
cd server
npm install
```

Crie um arquivo `.env` na pasta `server`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=estoque_db
PORT=3001
```

Inicie o servidor:

```bash
npm run dev
```

O backend estará rodando em `http://localhost:3001`

### 4️⃣ Configure o Frontend

Em outro terminal:

```bash
cd client
npm install
```

**Importante:** Edite o arquivo `client/services/api.ts` e altere o IP:

```typescript
export const api = axios.create({
    baseURL: "http://SEU_IP:3001", // Ex: http://192.168.0.20:3001
    timeout: 5000,
});
```

> 💡 **Como descobrir seu IP:**
> - Windows: `ipconfig` (IPv4 Address)
> - Mac/Linux: `ifconfig` ou `ip addr`

Inicie o app:

```bash
npx expo start
```

### 5️⃣ Teste no Celular

1. Instale o **Expo Go** no seu celular
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. Escaneie o QR Code que aparece no terminal

3. O app abrirá no Expo Go

> ⚠️ **Atenção:** Celular e computador devem estar na **mesma rede WiFi**

## 📱 Build para Produção (APK)

Para gerar um APK instalável:

```bash
# Instale o EAS CLI
npm install -g eas-cli

# Faça login no Expo
eas login

# Na pasta client, gere o build
cd client
eas build --platform android --profile preview
```

Após 10-15 minutos, você receberá um link para baixar o APK!

## 🗂️ Estrutura do Banco de Dados

### Tabelas Principais

- **usuario**: Usuários do sistema (admin/vendedor)
- **fornecedor**: Cadastro de fornecedores
- **produto**: Catálogo de produtos
- **estoque**: Locais de armazenamento
- **produto_estoque**: Controle de quantidade por estoque
- **movimentacao_estoque**: Histórico de entrada/saída

### Diagrama ER

```
usuario (1) ─────< (N) movimentacao_estoque
                         │
                         │ (N)
                         │
                         ▼ (1)
fornecedor (1) ───< (N) produto (1) ───< (N) produto_estoque (N) >──── (1) estoque
```

## 🔌 Endpoints da API

### Autenticação
- `POST /usuarios/cadastro` - Cadastrar novo usuário
- `POST /usuarios/login` - Fazer login

### Produtos
- `GET /produtos` - Listar produtos ativos
- `POST /produtos` - Criar novo produto
- `PUT /produtos/:id` - Atualizar produto
- `PUT /produtos/:id` - Desativar produto (soft delete)

### Fornecedores
- `GET /fornecedores` - Listar fornecedores
- `POST /fornecedores` - Criar novo fornecedor

## 🎨 Screenshots

### Tela de Login
![Login](docs/screenshots/login.png)

### CRUD de Produtos
![Produtos](docs/screenshots/produtos.png)

### Gerenciamento de Fornecedores
![Fornecedores](docs/screenshots/fornecedores.png)

> 📸 *Screenshots serão adicionadas em breve*

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m '[FEATURE] Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Padrão de Commits

- `[FRONTEND]` - Mudanças no app mobile
- `[BACKEND]` - Mudanças no servidor
- `[DATABASE]` - Alterações no banco de dados
- `[DOCS]` - Documentação
- `[FIX]` - Correção de bugs
- `[FEATURE]` - Nova funcionalidade

## 🐛 Problemas Conhecidos

- [ ] Campo de preço aceita mais de 2 casas decimais
- [ ] Validação de CNPJ não implementada
- [ ] Falta opção de recuperar senha

## 🚧 Roadmap

- [ ] Implementar dashboard com gráficos
- [ ] Adicionar relatórios em PDF
- [ ] Implementar busca e filtros avançados
- [ ] Sistema de notificações
- [ ] Sincronização offline
- [ ] Leitura de código de barras
- [ ] Exportação de dados para Excel

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Vinicius Bubols**

- GitHub: [@VBubols](https://github.com/VBubols)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!

Feito com ❤️
