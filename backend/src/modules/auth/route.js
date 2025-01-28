// baseRouter.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('./controller');
const jwtMiddleware = require('../../middlewares/jwt');

router.post('/register', register);
router.post('/login', login);
router.get('/', jwtMiddleware, getProfile);

module.exports = router;
