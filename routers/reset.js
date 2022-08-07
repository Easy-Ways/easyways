const router = express.Router();
const reset = require('../controllers/resetctrl');
router.get('/',reset.rendere);
router.post('/',reset.save);
module.exports = router;