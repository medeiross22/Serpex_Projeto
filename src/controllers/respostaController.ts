// ======================================================
// IMPORTAÇÃO DA CONEXÃO COM O BANCO
// ======================================================

const connection = require("../database/connection");

/**
 * ======================================================
 * RESPONDER PERGUNTA
 * ======================================================
 *
 * Esta função registra a resposta enviada por um usuário.
 *
 * O usuário é identificado através do Token JWT,
 * evitando que outro usuário possa responder em seu nome.
 */

const responderPergunta = (req: any, res: any) => {

    /**
     * Recupera o ID do usuário autenticado.
     *
     * Essa informação foi adicionada pelo middleware
     * autenticarToken após validar o JWT.
     */
    const usuario_id = req.usuario.id;

    // Recebe os demais dados enviados pelo cliente
    const {
        pergunta_id,
        simulacao_id,
        resposta
    } = req.body;

    /**
     * Busca a alternativa correta da pergunta.
     */
    const sqlPergunta =
        "SELECT opcao_correta FROM Pergunta WHERE id = ?";

    connection.query(
        sqlPergunta,
        [pergunta_id],
        (err: any, result: any) => {

            if (err) {

                return res.status(500).json({
                    erro: "Erro ao buscar pergunta."
                });

            }

            // Verifica se a pergunta existe
            if (result.length === 0) {

                return res.status(404).json({
                    erro: "Pergunta não encontrada."
                });

            }

            /**
             * Verifica se a resposta enviada
             * é igual à alternativa correta.
             */
            const correta =
                result[0].opcao_correta === resposta;

            /**
             * Salva a resposta no banco.
             */
            const sql = `

                INSERT INTO Resposta
                (resposta, correta, usuario_id, simulacao_id, pergunta_id)

                VALUES (?, ?, ?, ?, ?)

            `;

            connection.query(

                sql,

                [
                    resposta,
                    correta,
                    usuario_id,
                    simulacao_id,
                    pergunta_id
                ],

                (err: any) => {

                    if (err) {

                        return res.status(500).json({
                            erro: "Erro ao salvar resposta."
                        });

                    }

                    // Resposta cadastrada com sucesso
                    res.status(201).json({

                        mensagem: "Resposta registrada com sucesso!",

                        correta

                    });

                }

            );

        }

    );

};

// Exporta o controller
module.exports = {

    responderPergunta

};