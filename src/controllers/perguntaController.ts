// ======================================================
// IMPORTAÇÃO DAS DEPENDÊNCIAS
// ======================================================

// Importa a conexão com o banco de dados
const connection = require("../database/connection");

/**
 * ======================================================
 * CRIAR PERGUNTA
 * ======================================================
 *
 * Cadastra uma nova pergunta vinculada a uma simulação.
 */
const criarPergunta = (req: any, res: any) => {

    // Recebe os dados enviados pelo cliente
    const {
        enunciado,
        opcao_a,
        opcao_b,
        opcao_c,
        opcao_correta,
        simulacao_id
    } = req.body;

    // ======================================================
    // VALIDAÇÃO DOS CAMPOS OBRIGATÓRIOS
    // ======================================================

    if (
        !enunciado ||
        !opcao_a ||
        !opcao_b ||
        !opcao_c ||
        !opcao_correta ||
        !simulacao_id
    ) {

        return res.status(400).json({
            erro: "Todos os campos são obrigatórios."
        });

    }

    // Remove espaços extras
    const enunciadoLimpo = enunciado.trim();

    // ======================================================
    // VALIDAÇÃO DA ALTERNATIVA CORRETA
    // ======================================================

    const alternativa = opcao_correta.toUpperCase();

    if (!["A", "B", "C"].includes(alternativa)) {

        return res.status(400).json({
            erro: "A opção correta deve ser A, B ou C."
        });

    }

    // ======================================================
    // VERIFICA SE A SIMULAÇÃO EXISTE
    // ======================================================

    const sqlSimulacao =
        "SELECT id FROM Simulacao WHERE id = ?";

    connection.query(

        sqlSimulacao,

        [simulacao_id],

        (err: any, results: any) => {

            if (err) {

                console.error("Erro ao verificar simulação:", err);

                return res.status(500).json({
                    erro: "Erro interno do servidor."
                });

            }

            if (results.length === 0) {

                return res.status(404).json({
                    erro: "Simulação não encontrada."
                });

            }

            // ======================================================
            // INSERE A PERGUNTA
            // ======================================================

            const sql = `
                INSERT INTO Pergunta
                (
                    enunciado,
                    opcao_a,
                    opcao_b,
                    opcao_c,
                    opcao_correta,
                    simulacao_id
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            connection.query(

                sql,

                [
                    enunciadoLimpo,
                    opcao_a,
                    opcao_b,
                    opcao_c,
                    alternativa,
                    simulacao_id
                ],

                (err: any) => {

                    if (err) {

                        console.error("Erro ao criar pergunta:", err);

                        return res.status(500).json({
                            erro: "Erro ao criar pergunta."
                        });

                    }

                    return res.status(201).json({

                        mensagem: "Pergunta criada com sucesso!"

                    });

                }

            );

        }

    );

};

/**
 * ======================================================
 * LISTAR PERGUNTAS
 * ======================================================
 *
 * Retorna todas as perguntas cadastradas.
 */
const listarPerguntas = (req: any, res: any) => {

    const sql = "SELECT * FROM Pergunta";

    connection.query(

        sql,

        (err: any, results: any) => {

            if (err) {

                console.error("Erro ao buscar perguntas:", err);

                return res.status(500).json({
                    erro: "Erro ao buscar perguntas."
                });

            }

            // Caso não exista nenhuma pergunta cadastrada
            if (results.length === 0) {

                return res.status(200).json({

                    mensagem: "Nenhuma pergunta cadastrada.",

                    perguntas: []

                });

            }

            return res.status(200).json(results);

        }

    );

};

// ======================================================
// EXPORTAÇÃO DOS CONTROLLERS
// ======================================================

module.exports = {

    criarPergunta,

    listarPerguntas

};