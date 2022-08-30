const express = require('express');
const router = express.Router();
const dsearchctrl = require('../controllers/dsearchctrl');
router.get('/', dsearchctrl.search);
module.exports = router;