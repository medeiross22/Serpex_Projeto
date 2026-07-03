DROP DATABASE IF EXISTS serpex;

CREATE DATABASE IF NOT EXISTS serpex;
USE serpex;

-- ======================================================
-- TABELA USUÁRIO
-- ======================================================
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nivel INT DEFAULT 1,
    pontuacao INT DEFAULT 0
);

-- ======================================================
-- TABELA SIMULAÇÃO
-- ======================================================
CREATE TABLE Simulacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    nivel VARCHAR(50)
);

-- ======================================================
-- TABELA PERGUNTAS
-- ======================================================
CREATE TABLE Pergunta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enunciado TEXT NOT NULL,
    opcao_a VARCHAR(255),
    opcao_b VARCHAR(255),
    opcao_c VARCHAR(255),
    opcao_correta CHAR(1),
    simulacao_id INT,
    FOREIGN KEY (simulacao_id) REFERENCES Simulacao(id)
);

-- ======================================================
-- TABELA PROGRESSO
-- ======================================================
CREATE TABLE Progresso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nivel INT DEFAULT 1,
    pontuacao INT DEFAULT 0,
    usuario_id INT UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- ======================================================
-- TABELA RESPOSTAS
-- ======================================================
CREATE TABLE Resposta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resposta VARCHAR(1),
    correta BOOLEAN,
    data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT,
    simulacao_id INT,
    pergunta_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (simulacao_id) REFERENCES Simulacao(id),
    FOREIGN KEY (pergunta_id) REFERENCES Pergunta(id)
);

-- ======================================================
-- DADOS INICIAIS (TESTE)
-- ======================================================
INSERT INTO Simulacao (titulo, descricao, nivel)
VALUES ('Phishing Básico', 'Teste de e-mails falsos', 'Fácil');

-- ======================================================
-- CONSULTAS DE TESTE (OPCIONAL - NÃO USAR EM PRODUÇÃO)
-- ======================================================
SELECT * FROM Usuario;
SELECT * FROM Simulacao;
SELECT * FROM Pergunta;
SELECT * FROM Resposta;