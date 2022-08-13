const express = require('express');
const router = express.Router();
const d17 = require('../controllers/d17ctrl');
router.get('/', d17.rendere1);
router.post('/', d17.save);
module.exports = router;