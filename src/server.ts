// ======================================================
// IMPORTAÇÃO DAS DEPENDÊNCIAS
// ======================================================

// Importa o Express
const express = require("express");

// Carrega as variáveis de ambiente do arquivo .env
// Exemplo: JWT_SECRET
require("dotenv").config();

// Cria a aplicação Express
const app = express();

// ======================================================
// CONFIGURAÇÕES DA APLICAÇÃO
// ======================================================

// Permite que a API receba dados no formato JSON
app.use(express.json());

// ======================================================
// CONEXÃO COM O BANCO DE DADOS
// ======================================================

// Executa a conexão com o banco MySQL
require("./database/connection");

// ======================================================
// ROTA DE TESTE
// ======================================================

// Utilizada apenas para verificar se o servidor está online
app.get("/", (req: any, res: any) => {

    res.send("🚀 Serpex Security API rodando com sucesso!");

});

// ======================================================
// IMPORTAÇÃO DAS ROTAS
// ======================================================

// Rotas de usuários
const usuarioRoutes = require("./routes/usuarioRoutes");

// Rotas de perguntas
const perguntaRoutes = require("./routes/perguntaRoutes");

// Rotas de respostas
const respostaRoutes = require("./routes/respostaRoutes");

// Rotas de progresso
const progressoRoutes = require("./routes/progressoRoutes");

// ======================================================
// REGISTRO DAS ROTAS
// ======================================================

app.use(usuarioRoutes);

app.use(perguntaRoutes);

app.use(respostaRoutes);

app.use(progressoRoutes);

// ======================================================
// INICIALIZAÇÃO DO SERVIDOR
// ======================================================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(` Servidor iniciado na porta ${PORT}`);

});