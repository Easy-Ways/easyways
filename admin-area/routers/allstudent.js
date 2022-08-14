const express = require('express');
const router = express.Router();
const allstudentctrl = require('../controllers/allstudentctrl');
router.get('/',allstudentctrl.rendere);
module.exports = router;