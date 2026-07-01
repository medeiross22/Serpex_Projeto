// Importa o Express
const express = require("express");

// Cria uma nova instância do Router
const router = express.Router();

/*
|--------------------------------------------------------------------------
| Importação do Middleware de Autenticação
|--------------------------------------------------------------------------
|
| Antes de permitir que o usuário consulte seu progresso,
| verificamos se ele está autenticado através de um Token JWT.
|
*/
const autenticarToken = require("../middlewares/autenticarToken");

/*
|--------------------------------------------------------------------------
| Importação do Controller
|--------------------------------------------------------------------------
|
| progressoUsuario -> Responsável por retornar o progresso
| do usuário no sistema.
|
*/
const {
    progressoUsuario
} = require("../controllers/progressoController");

/*
|--------------------------------------------------------------------------
| ROTA PROTEGIDA
|--------------------------------------------------------------------------
|
| Esta rota exige autenticação.
|
| O cliente deverá enviar no Header:
|
| Authorization: Bearer SEU_TOKEN
|
*/

/**
 * ============================================================
 * GET /progresso/:usuario_id
 * ============================================================
 *
 * Responsável por consultar o progresso do usuário.
 *
 * Fluxo da requisição:
 *
 * Cliente
 *    │
 *    ▼
 * Envia Token JWT
 *    │
 *    ▼
 * Middleware autenticarToken
 *    │
 *    ▼
 * Token válido?
 *    │
 *    ├── Não → Retorna 401 ou 403
 *    │
 *    ▼
 * Sim
 *    │
 *    ▼
 * progressoUsuario()
 *
 */
router.get(

    "/progresso/:usuario_id",

    // Middleware que valida o Token JWT
    autenticarToken,

    // Controller responsável por consultar o progresso
    progressoUsuario

);

// Exporta as rotas
module.exports = router;