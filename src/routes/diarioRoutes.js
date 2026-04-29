const router = require('express').Router();
const controller = require('../controllers/diarioController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, controller.create);
router.get('/', auth, controller.resumo);

module.exports = router;
