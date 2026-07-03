// ======================================================
// IMPORTAÇÃO DO EXPRESS
// ======================================================

const express = require("express");
const router = express.Router();

// ======================================================
// MIDDLEWARE JWT
// ======================================================

const autenticarToken = require("../middlewares/autenticarToken");

// ======================================================
// CONTROLLER
// ======================================================

const {
    progressoUsuario
} = require("../controllers/progressoController");

// ======================================================
// ROTA PROTEGIDA (SEGURA)
// ======================================================

/**
 * GET /progresso
 *
 * Retorna o progresso do usuário autenticado.
 *
 * NÃO usa parâmetro na URL para evitar acesso indevido.
 */
router.get(

    "/progresso",

    autenticarToken,

    progressoUsuario

);

// ======================================================
// EXPORTAÇÃO
// ======================================================

module.exports = router;