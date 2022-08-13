const express = require('express');
const router = express.Router();
const d17 = require('../controllers/d17ctrl');
const bank = require('../controllers/bankctrl');
const pay = require('../controllers/payctrl');
router.get('/', pay.rendere);
router.get('/d17', d17.rendere1);
router.get('/bank', bank.rendere2);
router.post('/d17/', d17.save);
router.post('/bank/', bank.save);

module.exports = router;