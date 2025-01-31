
const { NotFoundError } = require("../../errors");
const contatoDAO = require("./contato.dao");
const messages = require("./contato.message");

const create = async (req, res) => {
  req.body.user = req.user;
  const data = await contatoDAO.create(req.body);
  return res.status(201).json({ success: true, message: messages.CREATED, data });
};

const createBatch = async (req, res) => {
  const { items } = req.body;
  items.forEach(item => item.id_usuario = req.user.id);
  const data = await contatoDAO.createBatch(items);
  return res.status(201).json({ success: true, message: messages.CREATED_BATCH, data });
};

const getAll = async (req, res) => {
  const { q } = req.query;
  const filters = { id_user: req.user.id };
  if (q) {
    filters.name = new RegExp(q, "i");
    filters.description = new RegExp(q, "i");
  }
  const data = await contatoDAO.getAll(filters);
  return res.status(200).json(data);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await contatoDAO.getById(id);
  if (!data) throw new NotFoundError(messages.NOT_FOUND);
  return res.status(200).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = await contatoDAO.update(id, req.body);
  if (!data) throw new NotFoundError(messages.NOT_FOUND);
  return res.status(200).json({ success: true, message: messages.UPDATED, data });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const data = await contatoDAO.remove(id);
  if (!data) throw new NotFoundError(messages.NOT_FOUND);
  return res.status(200).json({ success: true, message: messages.REMOVED, data });
};

module.exports = { create, createBatch, getAll, getOne, update, remove };
