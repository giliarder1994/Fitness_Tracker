const express = require('express');
const router = express.Router();
const diarioController = require('../controllers/diarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);


router.get('/resumo', diarioController.getResumoDiario);
router.post('/alimento', diarioController.adicionarConsumo);


router.post('/treino', diarioController.adicionarTreino);
router.get('/treino/hoje', diarioController.listarTreinoHoje);

module.exports = router;