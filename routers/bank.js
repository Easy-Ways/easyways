const express = require('express');
const router = express.Router();
const bank = require('../controllers/bankctrl');
router.get('/', bank.rendere2);
router.post('/', bank.save);
module.exports = router;