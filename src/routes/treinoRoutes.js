const router = require('express').Router();
const treinoController = require('../controllers/treinoController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validarCriacao } = require('../validators/treinoValidator');

router.use(authMiddleware);

router.post('/', validarCriacao, treinoController.criarTreino);
router.get('/', treinoController.listarTreinos);
router.get('/:id', treinoController.buscarPorId);
router.delete('/:id', treinoController.deletarTreino);

module.exports = router;
