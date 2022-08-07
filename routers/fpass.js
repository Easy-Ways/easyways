const express = require('express');
const router = express.Router();
const fpass = require('../controllers/fpassctrl');
router.get('/',fpass.rendere);
router.post('/',fpass.save);
module.exports = router;