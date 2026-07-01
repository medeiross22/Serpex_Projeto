// Importa o Express
const express = require("express");

// Cria uma nova instância do Router
const router = express.Router();

/*
|--------------------------------------------------------------------------
| Importação dos Controllers
|--------------------------------------------------------------------------
|
| criarUsuario -> Responsável pelo cadastro de novos usuários.
| loginUsuario -> Responsável por autenticar o usuário e gerar o JWT.
|
*/
const {
    criarUsuario,
    loginUsuario
} = require("../controllers/usuarioController");

/*
|--------------------------------------------------------------------------
| ROTAS PÚBLICAS
|--------------------------------------------------------------------------
|
| Essas rotas NÃO utilizam o middleware de autenticação,
| pois o usuário ainda não possui um Token JWT.
|
*/

/**
 * POST /usuario
 *
 * Realiza o cadastro de um novo usuário.
 *
 * Body esperado:
 *
 * {
 *   "nome": "Henrique",
 *   "email": "henrique@email.com",
 *   "senha": "123456"
 * }
 */
router.post("/usuario", criarUsuario);

/**
 * POST /login
 *
 * Realiza a autenticação do usuário.
 *
 * Caso o login seja válido,
 * um Token JWT será gerado e enviado
 * para o cliente.
 *
 * Body esperado:
 *
 * {
 *   "email": "henrique@email.com",
 *   "senha": "123456"
 * }
 */
router.post("/login", loginUsuario);

// Exporta as rotas
module.exports = router;