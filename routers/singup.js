const express = require('express');
const router = express.Router();
const signupctrl = require('../controllers/singupctrl');
router.get('/',signupctrl.rendere);
router.post('/',signupctrl.signup);
module.exports = router;