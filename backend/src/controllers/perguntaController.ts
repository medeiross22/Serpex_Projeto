const connection = require("../database/connection");

// CRIAR PERGUNTAS - POST
const criarPergunta = (req: any, res: any) => {
  const { enunciado, opcao_a, opcao_b, opcao_c, opcao_correta, simulacao_id } = req.body;

  const sql = `
    INSERT INTO pergunta 
    (enunciado, opcao_a, opcao_b, opcao_c, opcao_correta, simulacao_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [enunciado, opcao_a, opcao_b, opcao_c, opcao_correta, simulacao_id],
    (err: any, result: any) => {
      if (err) {
        console.error("Erro ao criar pergunta:", err);
        return res.status(500).json({ erro: "Erro ao criar pergunta" });
      }

      res.status(201).json({ mensagem: "Pergunta criada com sucesso!" });
    }
  );
};

// LISTAR PERGUNTAS - GET

const listarPerguntas = (req: any, res: any) => {
  const sql = "SELECT * FROM pergunta";

  connection.query(sql, (err: any, results: any) => {
    if (err) {
      console.error("Erro ao buscar perguntas:", err);
      return res.status(500).json({ erro: "Erro ao buscar perguntas" });
    }

    res.status(200).json(results);
  });
};


module.exports = {
  criarPergunta,
  listarPerguntas
};