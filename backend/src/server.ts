const express = require("express");

const app = express();

// permite JSON no body
app.use(express.json());

// conexão com o banco importa e executa
require("./database/connection");

// rota teste
app.get("/", (req: any, res: any) => {
  res.send("Serpex rodando!");
});

// rota post 
const usuarioRoutes = require("./routes/usuarioRoutes");
app.use(usuarioRoutes)

const perguntaRoutes = require("./routes/perguntaRoutes");
app.use(perguntaRoutes);

// inicia servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});