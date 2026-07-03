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
 * Recebe os dados enviados pelo cliente,
 * valida as informações,
 * criptografa a senha utilizando bcrypt
 * e salva o usuário no banco de dados.
 */
const criarUsuario = async (req: any, res: any) => {

    try {

        // Recebe os dados enviados pelo cliente
        const { nome, email, senha } = req.body;

        // ======================================================
        // VALIDAÇÃO DOS CAMPOS OBRIGATÓRIOS
        // ======================================================

        if (!nome || !email || !senha) {

            return res.status(400).json({
                erro: "Nome, email e senha são obrigatórios."
            });

        }

        // Remove espaços extras
        const nomeLimpo = nome.trim();
        const emailLimpo = email.trim().toLowerCase();

        // ======================================================
        // VALIDAÇÃO DO NOME
        // ======================================================

        if (nomeLimpo.length === 0) {

            return res.status(400).json({
                erro: "O nome não pode estar vazio."
            });

        }

        if (nomeLimpo.length > 100) {

            return res.status(400).json({
                erro: "O nome deve possuir no máximo 100 caracteres."
            });

        }

        // ======================================================
        // VALIDAÇÃO DO EMAIL
        // ======================================================

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(emailLimpo)) {

            return res.status(400).json({
                erro: "Email inválido."
            });

        }

        if (emailLimpo.length > 100) {

            return res.status(400).json({
                erro: "O email deve possuir no máximo 100 caracteres."
            });

        }

        // ======================================================
        // VALIDAÇÃO DA SENHA
        // ======================================================

        if (senha.length < 6) {

            return res.status(400).json({
                erro: "A senha deve possuir pelo menos 6 caracteres."
            });

        }

        // ======================================================
        // CRIPTOGRAFA A SENHA
        // ======================================================

        const senhaCriptografada = await bcrypt.hash(
            senha,
            SALT_ROUNDS
        );

        // SQL de cadastro
        const sql =
            "INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)";

        // Executa o INSERT
        connection.query(

            sql,

            [
                nomeLimpo,
                emailLimpo,
                senhaCriptografada
            ],

            (err: any) => {

                if (err) {

                    console.error("Erro ao cadastrar usuário:", err);

                    // Email já cadastrado
                    if (err.code === "ER_DUP_ENTRY") {

                        return res.status(400).json({
                            erro: "Email já cadastrado."
                        });

                    }

                    return res.status(500).json({
                        erro: "Erro ao cadastrar usuário."
                    });

                }

                // Cadastro realizado
                return res.status(201).json({

                    mensagem: "Usuário cadastrado com sucesso!"

                });

            }

        );

    } catch (error) {

        console.error("Erro no cadastro:", error);

        return res.status(500).json({

            erro: "Erro interno do servidor."

        });

    }

};

/**
 * ======================================================
 * LOGIN DO USUÁRIO
 * ======================================================
 *
 * Procura o usuário pelo email.
 * Caso exista, compara a senha digitada
 * com a senha criptografada utilizando bcrypt.
 * Se estiver correta, gera um Token JWT.
 */
const loginUsuario = (req: any, res: any) => {

    // Recebe email e senha
    const { email, senha } = req.body;

    // ======================================================
    // VALIDAÇÃO DOS CAMPOS
    // ======================================================

    if (!email || !senha) {

        return res.status(400).json({

            erro: "Email e senha são obrigatórios."

        });

    }

    const emailLimpo = email.trim().toLowerCase();

    // SQL responsável por localizar o usuário
    const sql =
        "SELECT * FROM Usuario WHERE email = ?";

    connection.query(

        sql,

        [emailLimpo],

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

            const usuario = results[0];

            let senhaCorreta = false;

            try {

                // Compara a senha digitada
                // com o hash armazenado
                senhaCorreta = await bcrypt.compare(

                    senha,

                    usuario.senha

                );

            } catch (error) {

                console.error("Erro ao comparar senha:", error);

                return res.status(500).json({

                    erro: "Erro ao validar senha."

                });

            }

            // Senha incorreta
            if (!senhaCorreta) {

                return res.status(401).json({

                    erro: "Email ou senha inválidos."

                });

            }

            // ======================================================
            // VERIFICA SE A CHAVE JWT EXISTE
            // ======================================================

            if (!process.env.JWT_SECRET) {

                console.error("JWT_SECRET não configurado.");

                return res.status(500).json({

                    erro: "Erro de configuração do servidor."

                });

            }

            // ======================================================
            // GERAÇÃO DO TOKEN JWT
            // ======================================================

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

            // ======================================================
            // RESPOSTA
            // ======================================================

            return res.status(200).json({

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

// ======================================================
// EXPORTAÇÃO DOS CONTROLLERS
// ======================================================

module.exports = {

    criarUsuario,

    loginUsuario

};