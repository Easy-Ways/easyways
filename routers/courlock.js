const express = require('express');
const router = express.Router();
const courlockctrl = require('../controllers/courlockctrl');
router.get('/', courlockctrl.rendere);
module.exports = router;
