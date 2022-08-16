const express = require('express');
const router = express.Router();
const cctrl = require('../controllers/addprofctrl');
router.get('/',cctrl.rendere);
router.post('/',cctrl.save);
module.exports = router;