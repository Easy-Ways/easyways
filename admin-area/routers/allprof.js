const express = require('express');
const router = express.Router();
const allprofctrl = require('../controllers/allprofctrl');
router.get('/',allprofctrl.rendere);
module.exports = router;