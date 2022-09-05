const express = require('express');
const router = express.Router();
const home = require('../controllers/homectrl');
router.get('/', home.rendere);
module.exports = router;