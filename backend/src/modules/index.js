// baseRouter.js
const express = require('express');
const router = express.Router();
const routeItem = require('./item/item.route');
const routeAuth = require('./auth/auth.route');
const routeContato = require("./contato/contato.route");

router.use('/item', routeItem);
router.use('/contato', routeContato);
router.use('/auth', routeAuth);

module.exports = router;
