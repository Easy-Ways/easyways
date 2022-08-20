const express = require('express');
const router = express.Router();
const editstudentctrl = require('../controllers/editstudentctrl');
router.get('/',editstudentctrl.rendere);
router.post('/sub',editstudentctrl.sub);
router.post('/activate',editstudentctrl.activate);
router.post('/class',editstudentctrl.save);
module.exports = router;