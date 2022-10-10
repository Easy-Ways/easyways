const express = require('express');
const router = express.Router();
const uploadctrl = require('../controllers/forumctrl');
router.get('/', uploadctrl.rendere);
module.exports = router;