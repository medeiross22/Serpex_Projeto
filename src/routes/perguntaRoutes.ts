// ======================================================
// IMPORTAÇÃO DAS DEPENDÊNCIAS
// ======================================================

// Importa o Express
const express = require("express");

// Cria uma nova instância do Router
const router = express.Router();

// ======================================================
// IMPORTAÇÃO DO MIDDLEWARE
// ======================================================

/**
 * Middleware responsável por validar o Token JWT.
 *
 * Todas as rotas que utilizam este middleware
 * exigem que o usuário esteja autenticado.
 */
const autenticarToken = require("../middlewares/autenticarToken");

// ======================================================
// IMPORTAÇÃO DOS CONTROLLERS
// ======================================================

const {
    criarPergunta,
    listarPerguntas
} = require("../controllers/perguntaController");

// ======================================================
// ROTAS PROTEGIDAS
// ======================================================

/**
 * ------------------------------------------------------
 * POST /pergunta
 * ------------------------------------------------------
 *
 * Objetivo:
 * Cadastrar uma nova pergunta no sistema.
 *
 * Esta rota somente poderá ser acessada por
 * usuários autenticados.
 *
 * Header obrigatório:
 *
 * Authorization: Bearer TOKEN
 *
 * Fluxo:
 *
 * Cliente
 *      │
 *      ▼
 * autenticarToken
 *      │
 *      ▼
 * Token válido?
 *      │
 *  ┌───┴─────────┐
 *  │             │
 * Não           Sim
 *  │             │
 *  ▼             ▼
 *401/403   criarPergunta()
 *
 */

router.post(

    "/pergunta",

    // Valida o Token JWT antes de acessar o controller
    autenticarToken,

    // Executa o cadastro da pergunta
    criarPergunta

);

/**
 * ------------------------------------------------------
 * GET /pergunta
 * ------------------------------------------------------
 *
 * Objetivo:
 * Listar todas as perguntas cadastradas.
 *
 * Apenas usuários autenticados podem
 * visualizar as perguntas do sistema.
 *
 * Header obrigatório:
 *
 * Authorization: Bearer TOKEN
 */

router.get(

    "/pergunta",

    // Valida o Token JWT
    autenticarToken,

    // Lista todas as perguntas
    listarPerguntas

);

// ======================================================
// EXPORTAÇÃO DAS ROTAS
// ======================================================

module.exports = router;