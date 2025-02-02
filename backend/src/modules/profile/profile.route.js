// baseRouter.js
const express = require('express');
const { getOne, update } = require('./profile.controller');
const jwtMiddleware = require('../../middlewares/jwt');
const router = express.Router();

router.use(jwtMiddleware);

router.get('/', getOne);
router.put('/', update);

module.exports = router;
