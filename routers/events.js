const express = require('express');
const router = express.Router();
const eventctrl = require('../controllers/eventsctrl');
router.get('/', eventctrl.rendere);
module.exports = router;