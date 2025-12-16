# 🚀 Guia de Instalação - App de Estoque

## Pré-requisitos
- Node.js 18+ instalado
- Git instalado
- Expo Go no celular (para testar)

## 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/VBubols/estoque_app.git
cd estoque_app
```

## 2️⃣ Configurar o Backend
```bash
cd server
npm install
```

### Criar arquivo .env

Crie um arquivo `.env` na pasta `server` com:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3001
```

### Importar o Banco de Dados

Execute o script SQL para criar as tabelas no MySQL.

### Iniciar o Backend
```bash
npm run dev
```

O servidor vai rodar em `http://localhost:3001`

## 3️⃣ Configurar o Frontend

**Em outro terminal:**
```bash
cd client
npm install
```

### Configurar a URL da API

Edite o arquivo `client/services/api.ts` e **troque o IP** para o IP da máquina que está rodando o backend:
```typescript
export const api = axios.create({
    baseURL: "http://SEU_IP_AQUI:3001", // Ex: http://192.168.0.20:3001
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
```

**Para descobrir seu IP:**
- Windows: `ipconfig` (procure por IPv4)
- Mac/Linux: `ifconfig` ou `ip addr`

### Iniciar o App
```bash
npx expo start
```

## 4️⃣ Testar no Celular

1. Instale o **Expo Go** no seu celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
2. Escaneie o QR Code que aparece no terminal
3. O app vai abrir no Expo Go

**⚠️ IMPORTANTE:** O celular e o computador precisam estar na **mesma rede WiFi**!