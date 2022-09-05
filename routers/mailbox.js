const express = require('express');
const router = express.Router();
const mailctrl = require('../controllers/mailctrl');
router.get('/', mailctrl.rendere);
module.exports = router;