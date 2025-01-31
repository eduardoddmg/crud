const { NotFoundError } = require("../../errors");
const ItemDAO = require("./item.dao.");
const messages = require("./item.message");

// Função para criar um novo registro
const create = async (req, res) => {
  req.body.id_usuario = req.user.id; // Adiciona o ID do usuário autenticado

  const data = await ItemDAO.create(req.body);

  return res.status(201).json({
    success: true,
    message: messages.CREATED,
    data,
  });
};

// Função para criar registros em lote
const createBatch = async (req, res) => {
  const { items } = req.body;
  items.forEach((element) => {
    element.id_usuario = req.user.id; // Adiciona o ID do usuário autenticado
  });
  const data = await ItemDAO.createBatch(items);

  return res.status(201).json({
    success: true,
    message: messages.CREATED_BATCH,
    data,
  });
};

// Função para buscar todos os registros com suporte a pesquisas (q)
const getAll = async (req, res) => {
  const { q } = req.query; // Captura o parâmetro de pesquisa
  const filters = { id_usuario: req.user.id }; // Filtra apenas os registros do usuário autenticado

  if (q) {
    filters.name = new RegExp(q, "i"); // Simula ILIKE para JSON
    filters.description = new RegExp(q, "i");
  }

  const data = await ItemDAO.getAll(filters); // Passa os filtros para o DAO
  return res.status(200).json(data);
};

// Função para buscar um registro pelo ID
const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await ItemDAO.getById(id);

  if (!data) {
    throw new NotFoundError(messages.NOT_FOUND);
  }

  return res.status(200).json(data);
};

// Função para atualizar um registro pelo ID
const update = async (req, res) => {
  const { id } = req.params;
  const data = await ItemDAO.update(id, req.body);

  if (!data) {
    throw new NotFoundError(messages.NOT_FOUND);
  }

  return res.status(200).json({
    success: true,
    message: messages.UPDATED,
    data: data,
  });
};

// Função para remover um registro pelo ID
const remove = async (req, res) => {
  const { id } = req.params;
  const data = await ItemDAO.remove(id);

  if (!data) {
    throw new NotFoundError(messages.NOT_FOUND);
  }

  return res.status(200).json({
    success: true,
    message: messages.REMOVED,
    data: data,
  });
};

module.exports = { create, createBatch, getAll, getOne, update, remove };
