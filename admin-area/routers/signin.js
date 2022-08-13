const express = require('express');
const router = express.Router();
const signinctrl = require('../controllers/signinctrl');
router.get('/',signinctrl.rendere);
router.post('/',signinctrl.signin);
module.exports = router;
