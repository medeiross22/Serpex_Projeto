const express = require("express");
const router = express.Router();

const { progressoUsuario } = require("../controllers/progressoController");
//get
router.get("/progresso/:usuario_id", progressoUsuario);

module.exports = router;