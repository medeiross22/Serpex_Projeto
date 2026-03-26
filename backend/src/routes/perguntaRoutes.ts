const express = require("express");
const router = express.Router();

const { criarPergunta, listarPerguntas } = require("../controllers/perguntaController");

router.post("/pergunta", criarPergunta);
router.get("/pergunta", listarPerguntas);

module.exports = router;