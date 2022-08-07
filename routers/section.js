const express = require('express');
const router = express.Router();
const sectionctrl = require('../controllers/sectionctrl');
router.get('/sectionl',sectionctrl.l);
router.get('/sectionf',sectionctrl.F);
router.post('/section',sectionctrl.save);
module.exports = router;