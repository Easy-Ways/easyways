const express = require('express');
const router = express.Router();
const sub = require('../controllers/sub-upctrl');
router.get('/',sub.rendere);
router.post('/',sub.save);
module.exports = router;