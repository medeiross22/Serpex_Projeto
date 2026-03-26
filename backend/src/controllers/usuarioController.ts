const connection = require("../database/connection");

// rota post
const criarUsuario = (req: any, res: any) => {
  const { nome, email, senha } = req.body;

  const sql = "INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)";

  connection.query(sql, [nome, email, senha], (err: any, result: any) => {
    if (err) {
      console.error("Erro ao cadastrar usuário:", err);
      return res.status(500).json({ erro: "Erro no servidor" });
    }

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  });
};


//LOGINN

const loginUsuario = (req: any, res: any) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";

  connection.query(sql, [email, senha], (err: any, results: any) => {
    if (err) {
      console.error("Erro no login:", err);
      return res.status(500).json({ erro: "Erro no servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    res.status(200).json({ mensagem: "Login realizado com sucesso!", usuario: results[0] });
  });
};

module.exports = {
  criarUsuario,
  loginUsuario
};