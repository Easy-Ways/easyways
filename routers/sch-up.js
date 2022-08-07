const express = require('express');
const router = express.Router();
const sch = require('../controllers/sch-upctrl');
router.get('/',sch.rendere);
router.post('/',sch.save);
module.exports = router;