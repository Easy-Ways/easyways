const express = require('express');
const router = express.Router();
const cour_progressctrl = require('../controllers/cour_progressctrl');
router.post('/', cour_progressctrl.rendere);
module.exports = router;