const express = require('express');
const router = express.Router();
const cctrl = require('../controllers/outctrl');
router.get('/',cctrl.rendere);
module.exports = router;