const express = require('express');
const router = express.Router();
const schedulectrl = require('../controllers/schedulectrl');
router.get('/', schedulectrl.rendere);
module.exports = router;