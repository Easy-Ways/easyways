const express = require('express');
const router = express.Router();
const contactctrl = require('../controllers/contactctrl');
router.get('/',contactctrl.rendere);
router.post('/',contactctrl.save);
module.exports = router;