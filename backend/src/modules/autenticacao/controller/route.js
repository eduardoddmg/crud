// baseRouter.js
const express = require('express');
const {
  getAll,
  getOne,
  create,
  update,
  remove,
  getColuna,
} = require('./controller');
const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);
router.get('/:id/coluna', getColuna);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
