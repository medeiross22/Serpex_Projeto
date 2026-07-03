// ======================================================
// IMPORTAÇÃO DO EXPRESS
// ======================================================

const express = require("express");

// Cria o router do Express
const router = express.Router();

// ======================================================
// IMPORTAÇÃO DOS CONTROLLERS
// ======================================================

const {
    criarUsuario,
    loginUsuario
} = require("../controllers/usuarioController");

// ======================================================
// ROTAS PÚBLICAS (SEM JWT)
// ======================================================

/**
 * ======================================================
 * CADASTRO DE USUÁRIO
 * ======================================================
 *
 * Rota responsável por criar um novo usuário no sistema.
 *
 * Método: POST
 * URL: /usuario
 */
router.post("/usuario", criarUsuario);

/**
 * ======================================================
 * LOGIN DE USUÁRIO
 * ======================================================
 *
 * Autentica o usuário e retorna um token JWT.
 *
 * Método: POST
 * URL: /login
 */
router.post("/login", loginUsuario);

// ======================================================
// EXPORTAÇÃO
// ======================================================

module.exports = router;