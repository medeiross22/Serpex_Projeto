const express = require("express");
const router = express.Router();

//rota post
const { criarUsuario, loginUsuario } = require("../controllers/usuarioController");

router.post("/usuario", criarUsuario);
router.post("/login", loginUsuario);

module.exports = router;