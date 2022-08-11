const express = require('express');
const router = express.Router();
const pay = require('../controllers/paymentctrl');
router.get('/', pay.rendere);
module.exports = router;