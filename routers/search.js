const express = require('express');
const router = express.Router();
const searchctrl = require('../controllers/searchctrl');
router.get('/', searchctrl.search);
module.exports = router;