const express = require("express");
const router = express.Router();

const { responderPergunta } = require("../controllers/respostaController");
//post
router.post("/resposta", responderPergunta);

module.exports = router;