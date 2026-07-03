// ======================================================
// IMPORTAÇÃO DA CONEXÃO COM O BANCO
// ======================================================

const connection = require("../database/connection");

/**
 * ======================================================
 * RESPONDER PERGUNTA
 * ======================================================
 *
 * Registra a resposta do usuário autenticado
 * e verifica se está correta.
 */

const responderPergunta = (req: any, res: any) => {

    // ======================================================
    // VERIFICA SE O USUÁRIO ESTÁ AUTENTICADO
    // ======================================================

    if (!req.usuario || !req.usuario.id) {

        return res.status(401).json({
            erro: "Usuário não autenticado."
        });

    }

    const usuario_id = req.usuario.id;

    // ======================================================
    // DADOS DA REQUISIÇÃO
    // ======================================================

    const {
        pergunta_id,
        simulacao_id,
        resposta
    } = req.body;

    // ======================================================
    // VALIDAÇÃO DOS CAMPOS
    // ======================================================

    if (!pergunta_id || !simulacao_id || !resposta) {

        return res.status(400).json({
            erro: "Todos os campos são obrigatórios."
        });

    }

    const respostaLimpa = resposta.toUpperCase().trim();

    // ======================================================
    // VALIDAÇÃO DA RESPOSTA
    // ======================================================

    if (!["A", "B", "C"].includes(respostaLimpa)) {

        return res.status(400).json({
            erro: "Resposta inválida. Use A, B ou C."
        });

    }

    // ======================================================
    // BUSCA A PERGUNTA
    // ======================================================

    const sqlPergunta =
        "SELECT opcao_correta FROM Pergunta WHERE id = ?";

    connection.query(

        sqlPergunta,

        [pergunta_id],

        (err: any, result: any) => {

            if (err) {

                console.error("Erro ao buscar pergunta:", err);

                return res.status(500).json({
                    erro: "Erro ao buscar pergunta."
                });

            }

            // Pergunta não encontrada
            if (result.length === 0) {

                return res.status(404).json({
                    erro: "Pergunta não encontrada."
                });

            }

            const corretaBD = result[0].opcao_correta.toUpperCase();

            // ======================================================
            // VERIFICA SE ACERTOU
            // ======================================================

            const correta = corretaBD === respostaLimpa;

            // ======================================================
            // SALVA A RESPOSTA
            // ======================================================

            const sql = `
                INSERT INTO Resposta
                (resposta, correta, usuario_id, simulacao_id, pergunta_id)
                VALUES (?, ?, ?, ?, ?)
            `;

            connection.query(

                sql,

                [
                    respostaLimpa,
                    correta,
                    usuario_id,
                    simulacao_id,
                    pergunta_id
                ],

                (err: any) => {

                    if (err) {

                        console.error("Erro ao salvar resposta:", err);

                        return res.status(500).json({
                            erro: "Erro ao salvar resposta."
                        });

                    }

                    return res.status(201).json({

                        mensagem: "Resposta registrada com sucesso!",

                        correta

                    });

                }

            );

        }

    );

};

// ======================================================
// EXPORTAÇÃO
// ======================================================

module.exports = {

    responderPergunta

};