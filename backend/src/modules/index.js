// baseRouter.js
const express = require('express');
const router = express.Router();
const routeAutenticacao = require('./autenticacao/route');
const routeConfiguracao = require('./configuracao/route');
const routeItem = require('./item/route');
const routeAuth = require('./auth/route');

router.use('/autenticacao', routeAutenticacao);
router.use('/configuracao', routeConfiguracao);
router.use('/item', routeItem);
router.use('/auth', routeAuth);

module.exports = router;
