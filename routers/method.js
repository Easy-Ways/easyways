const express = require('express');
const router = express.Router();
const methodctrl = require('../controllers/methodctrl');
router.get('/', methodctrl.rendere);
module.exports = router;