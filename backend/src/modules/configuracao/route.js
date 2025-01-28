// baseRouter.js
const express = require('express');
const router = express.Router();

const routeColuna = require('./coluna/route');

router.use('/coluna', routeColuna);

module.exports = router;
