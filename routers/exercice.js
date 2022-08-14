const express = require('express');
const router = express.Router();
const exercicectrl = require('../controllers/exercicectrl');
router.get('/', exercicectrl.rendere);
module.exports = router;