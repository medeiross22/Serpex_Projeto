const connection = require("../database/connection");

const progressoUsuario = (req: any, res: any) => {
  const { usuario_id } = req.params;

  const sql = `
    SELECT 
      COUNT(*) AS total,
      SUM(correta = true) AS acertos,
      SUM(correta = false) AS erros
    FROM resposta
    WHERE usuario_id = ?
  `;

  connection.query(sql, [usuario_id], (err: any, result: any) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao calcular progresso" });
    }

    res.status(200).json(result[0]);
  });
};

module.exports = {
  progressoUsuario
};