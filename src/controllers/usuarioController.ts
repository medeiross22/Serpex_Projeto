// ======================================================
// IMPORTAÇÃO DAS DEPENDÊNCIAS
// ======================================================

// Importa a conexão com o banco de dados
const connection = require("../database/connection");

// Biblioteca responsável por gerar os Tokens JWT
const jwt = require("jsonwebtoken");

// Biblioteca responsável por criptografar e verificar senhas
const bcrypt = require("bcrypt");

// Número de rounds utilizados pelo bcrypt.
// Quanto maior o número, mais segura (e mais lenta) será a criptografia.
const SALT_ROUNDS = 10;

/**
 * ======================================================
 * CADASTRO DE USUÁRIO
 * ======================================================
 *
 * Recebe os dados do usuário, criptografa a senha utilizando
 * bcrypt e salva o novo usuário no banco de dados.
 */
const criarUsuario = async (req: any, res: any) => {

    try {

        // Recebe os dados enviados pelo cliente
        const { nome, email, senha } = req.body;

        // Criptografa a senha antes de armazená-la no banco
        const senhaCriptografada = await bcrypt.hash(
            senha,
            SALT_ROUNDS
        );

        // Comando SQL responsável pelo cadastro
        const sql =
            "INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)";

        // Executa o INSERT utilizando a senha criptografada
        connection.query(
            sql,
            [nome, email, senhaCriptografada],
            (err: any, result: any) => {

                if (err) {

                    console.error("Erro ao cadastrar usuário:", err);

                    // Verifica se o e-mail já existe
                    if (err.code === "ER_DUP_ENTRY") {

                        return res.status(400).json({
                            erro: "Email já cadastrado."
                        });

                    }

                    return res.status(500).json({
                        erro: "Erro ao cadastrar usuário."
                    });

                }

                // Cadastro realizado com sucesso
                res.status(201).json({

                    mensagem: "Usuário cadastrado com sucesso!"

                });

            }
        );

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao criptografar a senha."
        });

    }

};

/**
 * ======================================================
 * LOGIN DO USUÁRIO
 * ======================================================
 *
 * Procura o usuário pelo e-mail.
 * Caso exista, compara a senha digitada
 * com a senha criptografada armazenada no banco.
 *
 * Se estiver correta, gera um Token JWT.
 */
const loginUsuario = (req: any, res: any) => {

    // Recebe email e senha enviados pelo cliente
    const { email, senha } = req.body;

    /**
     * Agora procuramos o usuário APENAS pelo e-mail.
     * A comparação da senha será feita utilizando bcrypt.
     */
    const sql =
        "SELECT * FROM Usuario WHERE email = ?";

    connection.query(
        sql,
        [email],
        async (err: any, results: any) => {

            if (err) {

                console.error("Erro no login:", err);

                return res.status(500).json({
                    erro: "Erro interno do servidor."
                });

            }

            // Usuário não encontrado
            if (results.length === 0) {

                return res.status(401).json({
                    erro: "Email ou senha inválidos."
                });

            }

            // Recupera o usuário encontrado
            const usuario = results[0];

            /**
             * Compara a senha digitada
             * com o hash armazenado no banco.
             */
            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            );

            // Caso a senha esteja incorreta
            if (!senhaCorreta) {

                return res.status(401).json({
                    erro: "Email ou senha inválidos."
                });

            }

            /**
             * Geração do Token JWT.
             */
            const token = jwt.sign(

                {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "2h"
                }

            );

            /**
             * Nunca retornamos a senha para o cliente.
             */
            res.status(200).json({

                mensagem: "Login realizado com sucesso!",

                token,

                usuario: {

                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    nivel: usuario.nivel,
                    pontuacao: usuario.pontuacao

                }

            });

        }

    );

};

// Exporta os métodos do controller
module.exports = {

    criarUsuario,

    loginUsuario

};