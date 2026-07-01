// ======================================================
// IMPORTAÇÃO DAS DEPENDÊNCIAS
// ======================================================

// Biblioteca responsável por validar os Tokens JWT
const jwt = require("jsonwebtoken");

/**
 * ======================================================
 * MIDDLEWARE DE AUTENTICAÇÃO
 * ======================================================
 *
 * Este middleware é executado antes das rotas protegidas.
 *
 * Sua responsabilidade é:
 *
 * ✔ Verificar se o cliente enviou um Token JWT.
 * ✔ Validar se o token foi gerado pela aplicação.
 * ✔ Verificar se o token ainda está válido.
 * ✔ Disponibilizar os dados do usuário na requisição.
 *
 * Caso alguma validação falhe, o acesso é bloqueado.
 */

const autenticarToken = (req: any, res: any, next: any) => {

    // Recupera o cabeçalho Authorization
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho foi enviado
    if (!authHeader) {

        return res.status(401).json({
            erro: "Token não informado."
        });

    }

    /**
     * O cabeçalho deve seguir o formato:
     *
     * Authorization: Bearer TOKEN
     */

    const partes = authHeader.split(" ");

    // Verifica se o formato do cabeçalho é válido
    if (partes.length !== 2 || partes[0] !== "Bearer") {

        return res.status(401).json({
            erro: "Formato do token inválido."
        });

    }

    // Recupera apenas o Token
    const token = partes[1];

    try {

        /**
         * Valida o Token utilizando a chave secreta
         * armazenada no arquivo .env
         */
        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        /**
         * Armazena as informações do usuário
         * para utilização nos próximos controllers.
         *
         * Exemplo:
         *
         * req.usuario.id
         * req.usuario.nome
         * req.usuario.email
         */
        req.usuario = usuario;

        // Permite que a requisição continue
        next();

    } catch (error) {

        // Token inválido ou expirado
        return res.status(403).json({

            erro: "Token inválido ou expirado."

        });

    }

};

// Exporta o middleware
module.exports = autenticarToken;