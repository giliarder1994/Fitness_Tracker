const router = require('express').Router();
const controller = require('../controllers/treinoController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, controller.create);
router.get('/', auth, controller.getAll);

module.exports = router;