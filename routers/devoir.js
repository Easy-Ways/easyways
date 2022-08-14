const express = require('express');
const router = express.Router();
const devoirctrl = require('../controllers/devoirctrl');
router.get('/', devoirctrl.rendere);
module.exports = router;