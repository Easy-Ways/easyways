const express = require('express');
const router = express.Router();
const coursectrl = require('../controllers/coursectrl');
router.get('/', coursectrl.rendere);
module.exports = router;
