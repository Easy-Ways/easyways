const express = require('express');
const router = express.Router();
const notesctrl = require('../controllers/notesctrl');
router.get('/',notesctrl.rendere);
module.exports = router;