// Importa o Express
const express = require("express");

// Cria uma nova instância do Router
const router = express.Router();

/*
|--------------------------------------------------------------------------
| Importação do Middleware de Autenticação
|--------------------------------------------------------------------------
|
| Antes de permitir que o usuário responda uma pergunta,
| verificamos se ele está autenticado através de um Token JWT.
|
*/
const autenticarToken = require("../middlewares/autenticarToken");

/*
|--------------------------------------------------------------------------
| Importação do Controller
|--------------------------------------------------------------------------
|
| responderPergunta -> Responsável por registrar uma resposta
| no banco de dados.
|
*/
const {
    responderPergunta
} = require("../controllers/respostaController");

/*
|--------------------------------------------------------------------------
| ROTA PROTEGIDA
|--------------------------------------------------------------------------
|
| Esta rota só poderá ser utilizada por usuários autenticados.
|
| Header obrigatório:
|
| Authorization: Bearer SEU_TOKEN
|
*/

/**
 * ============================================================
 * POST /resposta
 * ============================================================
 *
 * Responsável por registrar uma resposta do usuário.
 *
 * Fluxo da requisição:
 *
 * Cliente
 *    │
 *    ▼
 * Envia o Token JWT
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
 * responderPergunta()
 *
 */
router.post(

    "/resposta",

    // Valida o Token JWT antes de acessar o controller
    autenticarToken,

    // Executa o controller responsável por salvar a resposta
    responderPergunta

);

// Exporta as rotas
module.exports = router;