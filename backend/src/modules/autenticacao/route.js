// baseRouter.js
const express = require('express');
const router = express.Router();

const routeSistema = require('./sistema/route');
const routeController = require('./controller/route');
const routeRegra = require('./regra/route');
const routeRegraAcao = require('./regra-acao/route');
const routeAcao = require('./acao/route');

router.use('/sistema', routeSistema);
router.use('/controller', routeController);
router.use('/regra', routeRegra);
router.use('/regra-acao', routeRegraAcao);
router.use('/acao', routeAcao);

module.exports = router;
