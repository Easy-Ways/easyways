const express = require('express');
const router = express.Router();
const profilectrl = require('../controllers/profilectrl');
router.get('/', profilectrl.rendere);
router.post('/uinfo', profilectrl.update);
router.post('/usub', profilectrl.updatesub);
module.exports = router;