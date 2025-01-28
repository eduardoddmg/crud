// baseRouter.js
const express = require('express');
const { getAll, getOne, create, update, remove } = require('./controller');
const jwtMiddleware = require('../../middlewares/jwt');
const router = express.Router();

router.use(jwtMiddleware);

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
