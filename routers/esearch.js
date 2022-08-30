const express = require('express');
const router = express.Router();
const esearchctrl = require('../controllers/esearchctrl');
router.get('/', esearchctrl.search);
module.exports = router;