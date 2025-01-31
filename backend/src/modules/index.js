// baseRouter.js
const express = require('express');
const router = express.Router();
const routeContato = require('./contato/contato.route');
const routeItem = require('./item/item.route');
const routeAuth = require('./auth/auth.route');

router.use('/item', routeItem);
router.use('/auth', routeAuth);
router.use('/contato', routeContato);

module.exports = router;
