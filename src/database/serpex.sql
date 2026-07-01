-- ==========================================================
-- PROJETO INTEGRADOR - SERPEX SECURITY
-- Banco de Dados
-- ==========================================================

-- Remove o banco caso ele já exista
DROP DATABASE IF EXISTS serpex;

-- Cria o banco de dados
CREATE DATABASE serpex;

-- Seleciona o banco
USE serpex;

-- ==========================================================
-- TABELA: USUARIO
-- ==========================================================
--
-- Armazena os usuários do sistema.
--
-- A senha NÃO é armazenada em texto puro.
-- Ela será criptografada utilizando bcrypt
-- antes de ser salva pelo backend.
--
CREATE TABLE Usuario (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    -- Hash gerado pelo bcrypt
    senha VARCHAR(255) NOT NULL,

    nivel INT DEFAULT 1,

    pontuacao INT DEFAULT 0

);

-- ==========================================================
-- TABELA: SIMULACAO
-- ==========================================================

CREATE TABLE Simulacao (

    id INT AUTO_INCREMENT PRIMARY KEY,

    titulo VARCHAR(100) NOT NULL,

    descricao TEXT,

    nivel VARCHAR(50)

);

-- ==========================================================
-- TABELA: PERGUNTA
-- ==========================================================

CREATE TABLE Pergunta (

    id INT AUTO_INCREMENT PRIMARY KEY,

    enunciado TEXT NOT NULL,

    opcao_a VARCHAR(255),

    opcao_b VARCHAR(255),

    opcao_c VARCHAR(255),

    opcao_correta CHAR(1),

    simulacao_id INT,

    FOREIGN KEY (simulacao_id)
        REFERENCES Simulacao(id)

);

-- ==========================================================
-- TABELA: PROGRESSO
-- ==========================================================

CREATE TABLE Progresso (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nivel INT DEFAULT 1,

    pontuacao INT DEFAULT 0,

    usuario_id INT UNIQUE,

    FOREIGN KEY (usuario_id)
        REFERENCES Usuario(id)

);

-- ==========================================================
-- TABELA: RESPOSTA
-- ==========================================================

CREATE TABLE Resposta (

    id INT AUTO_INCREMENT PRIMARY KEY,

    resposta VARCHAR(1),

    correta BOOLEAN,

    data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    usuario_id INT,

    simulacao_id INT,

    pergunta_id INT,

    FOREIGN KEY (usuario_id)
        REFERENCES Usuario(id),

    FOREIGN KEY (simulacao_id)
        REFERENCES Simulacao(id),

    FOREIGN KEY (pergunta_id)
        REFERENCES Pergunta(id)

);

-- ==========================================================
-- DADOS INICIAIS
-- ==========================================================

INSERT INTO Simulacao
(
    titulo,
    descricao,
    nivel
)

VALUES
(
    "Phishing Básico",
    "Teste de e-mails falsos",
    "Fácil"
);

-- ==========================================================
-- CONSULTAS PARA TESTES
-- ==========================================================

SELECT * FROM Usuario;

SELECT * FROM Simulacao;

SELECT * FROM Pergunta;

SELECT * FROM Resposta;

SELECT * FROM Progresso;