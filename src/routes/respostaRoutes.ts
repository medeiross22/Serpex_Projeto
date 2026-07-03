// ======================================================
// IMPORTAÇÃO DO EXPRESS
// ======================================================

const express = require("express");
const router = express.Router();

// ======================================================
// MIDDLEWARE DE AUTENTICAÇÃO JWT
// ======================================================

const autenticarToken = require("../middlewares/autenticarToken");

// ======================================================
// CONTROLLER
// ======================================================

const {
    responderPergunta
} = require("../controllers/respostaController");

// ======================================================
// ROTA PROTEGIDA
// ======================================================

/**
 * POST /resposta
 *
 * Registra a resposta do usuário autenticado.
 *
 * Requer Header:
 * Authorization: Bearer TOKEN
 */

router.post(
    "/resposta",

    // Verifica JWT antes de acessar controller
    autenticarToken,

    // Registra resposta no banco
    responderPergunta
);

// ======================================================
// EXPORTAÇÃO
// ======================================================

module.exports = router;