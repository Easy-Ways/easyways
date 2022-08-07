const express = require('express');
const router = express.Router();
const subctrl = require('../controllers/subctrl');
router.get('/', subctrl.rendere);
router.post('/',subctrl.save);
module.exports = router;