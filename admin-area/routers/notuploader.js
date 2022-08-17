const express = require('express');
const router = express.Router();
const notuploadctrl = require('../controllers/notuploaderctrl');
router.get('/', notuploadctrl.rendere);
router.post('/', notuploadctrl.upload);
module.exports = router;