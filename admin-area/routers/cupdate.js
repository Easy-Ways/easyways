const express = require('express');
const router = express.Router();
const cup = require('../controllers/cupdate');
router.get('/',cup.rendere);
router.post('/',cup.save);
module.exports = router;