const express = require('express');
const router = express.Router();
const homectrl = require('../controllers/homectrl');
const cookieparser = require('cookie-parser');
router.get('/', homectrl.rendere);
router.get('/disconnect',homectrl.disconnect);
router.post('/',homectrl.reminder);
module.exports = router;
