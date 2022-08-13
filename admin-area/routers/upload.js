const express = require('express');
const router = express.Router();
const uploadctrl = require('../controllers/uploader');
router.get('/', uploadctrl.rendere);
router.post('/', uploadctrl.upload);
module.exports = router;