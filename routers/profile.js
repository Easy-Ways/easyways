const express = require('express');
const router = express.Router();
const profilectrl = require('../controllers/profilectrl');
router.get('/', profilectrl.rendere);
router.post('/', profilectrl.update);
module.exports = router;