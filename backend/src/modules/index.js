// baseRouter.js
const express = require('express');
const router = express.Router();

router.use('/item', require('./item/item.route'));
router.use('/auth', require('./auth/auth.route'));
router.use('/profile', require('./profile/profile.route'));

module.exports = router;
