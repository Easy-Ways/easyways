const express = require('express');
const router = express.Router();
const pricingctrl = require('../controllers/pricingctrl');
router.get('/', pricingctrl.rendere);
module.exports = router;