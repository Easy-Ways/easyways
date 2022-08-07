const express = require('express');
const router = express.Router();
const activatectrl = require('../controllers/activatectrl');
router.get('/', activatectrl.save);
module.exports = router;
