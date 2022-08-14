const express = require('express');
const router = express.Router();
const homectrl = require('../controllers/homectrl');
router.get('/', homectrl.rendere);
module.exports = router;
