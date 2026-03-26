const express = require("express");
const router = express.Router();

const { criarPergunta, listarPerguntas } = require("../controllers/perguntaController");
//post
router.post("/pergunta", criarPergunta);
//get
router.get("/pergunta", listarPerguntas);

module.exports = router;