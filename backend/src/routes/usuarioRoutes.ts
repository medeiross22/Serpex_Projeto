const express = require("express");
const router = express.Router();


const { criarUsuario, loginUsuario } = require("../controllers/usuarioController");
//post
router.post("/usuario", criarUsuario);
//post
router.post("/login", loginUsuario);

module.exports = router;