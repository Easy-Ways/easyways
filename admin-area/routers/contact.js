const express = require('express');
const router = express.Router();
const contactctrl = require('../controllers/contactctrl');
router.get('/',contactctrl.rendere);
module.exports = router;