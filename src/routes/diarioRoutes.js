const express = require("express");
const router = express.Router();
const diarioController = require("../controllers/diarioController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

route.get('/resumo', diarioController.getResumoDiario);
router.post('/registro', diarioController.adicionarConsumo);

module.exports = router;