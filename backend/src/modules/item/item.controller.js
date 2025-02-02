const { NotFoundError } = require('../../errors');
const ItemDAO = require('./item.dao.');

const create = async (req, res) => {
  req.body.user = req.user;
  const data = await ItemDAO.create(req.body);
  return res.status(201).json(data);
};

const getAll = async (req, res) => {
  const { q } = req.query;
  const filters = (item) =>
    item.user.id === req.user.id &&
    (item.name.includes(q) || item.description.includes(q));

  const data = await ItemDAO.getAll(filters);
  return res.status(200).json(data);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await ItemDAO.getById(id);

  if (!data) {
    throw new NotFoundError('Item não encontrado');
  }

  return res.status(200).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = await ItemDAO.update(id, req.body);

  if (!data) {
    throw new NotFoundError('Item não encontrado');
  }

  return res.status(200).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const data = await ItemDAO.remove(id);

  if (!data) {
    throw new NotFoundError('Item não encontrado');
  }

  return res.status(200).json(data);
};

module.exports = { create, getAll, getOne, update, remove };
