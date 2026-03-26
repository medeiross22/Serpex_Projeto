const connection = require("../database/connection");

const responderPergunta = (req: any, res: any) => {
  const { usuario_id, pergunta_id, simulacao_id, resposta } = req.body;

  const sqlPergunta = "SELECT opcao_correta FROM pergunta WHERE id = ?";

  connection.query(sqlPergunta, [pergunta_id], (err: any, result: any) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao buscar pergunta" });
    }

    const correta = result[0].opcao_correta === resposta;

    const sql = `
      INSERT INTO resposta 
      (resposta, correta, usuario_id, simulacao_id, pergunta_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(
      sql,
      [resposta, correta, usuario_id, simulacao_id, pergunta_id],
      (err: any) => {
        if (err) {
          return res.status(500).json({ erro: "Erro ao salvar resposta" });
        }

        res.status(201).json({
          mensagem: "Resposta salva!",
          correta
        });
      }
    );
  });
};

module.exports = {
  responderPergunta
};