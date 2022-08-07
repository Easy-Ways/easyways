const express = require('express');
const router = express.Router();
const aboutctrl = require('../controllers/aboutctrl');
router.get('/', aboutctrl.rendere);
module.exports = router;