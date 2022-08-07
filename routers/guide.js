const express = require('express');
const router = express.Router();
const guidectrl = require('../controllers/guidectrl');
router.get('/', guidectrl.rendere);
module.exports = router;