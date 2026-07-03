// ======================================================
// IMPORTAÇÃO DA CONEXÃO
// ======================================================

const connection = require("../database/connection");

/**
 * ======================================================
 * PROGRESSO DO USUÁRIO
 * ======================================================
 *
 * Retorna estatísticas de acertos e erros
 * do usuário baseado nas respostas registradas.
 */

const progressoUsuario = (req: any, res: any) => {

    // ======================================================
    // VALIDAÇÃO DO PARÂMETRO
    // ======================================================

    const { usuario_id } = req.params;

    if (!usuario_id) {

        return res.status(400).json({
            erro: "Usuário não informado."
        });

    }

    // ======================================================
    // CONSULTA DE PROGRESSO
    // ======================================================

    const sql = `
        SELECT 
            COUNT(*) AS total,
            COALESCE(SUM(correta = 1), 0) AS acertos,
            COALESCE(SUM(correta = 0), 0) AS erros
        FROM Resposta
        WHERE usuario_id = ?
    `;

    connection.query(

        sql,

        [usuario_id],

        (err: any, result: any) => {

            if (err) {

                console.error("Erro ao calcular progresso:", err);

                return res.status(500).json({
                    erro: "Erro ao calcular progresso."
                });

            }

            // Caso não haja registros
            if (!result || result.length === 0) {

                return res.status(200).json({

                    total: 0,
                    acertos: 0,
                    erros: 0

                });

            }

            return res.status(200).json(result[0]);

        }

    );

};

// ======================================================
// EXPORTAÇÃO
// ======================================================

module.exports = {

    progressoUsuario

};