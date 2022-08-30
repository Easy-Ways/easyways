const express = require('express');
const router = express.Router();
const msearchctrl = require('../controllers/msearchctrl');
router.get('/', msearchctrl.search);
module.exports = router;