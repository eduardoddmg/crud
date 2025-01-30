const { NotFoundError } = require('../../errors');
const ItemDAO = require('./dao');

// Função para criar um novo registro
const create = async (req, res) => {
  req.body.id_usuario = req.user.id; // Adiciona o ID do usuário autenticado

  const data = await ItemDAO.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'Item criado com sucesso!',
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
    message: 'Itens criados com sucesso!',
    data,
  });
};

// Função para buscar todos os registros com suporte a pesquisas (q)
const getAll = async (req, res) => {
  const { q } = req.query; // Captura o parâmetro de pesquisa
  const filters = [`id_usuario = ${req.user.id}`]; // Filtra apenas os registros do usuário autenticado

  if (q) {
    // Adiciona o filtro de pesquisa
    filters.push(`(name ILIKE '%${q}%' or description ILIKE '%${q}%')`); // Substitua "nome" e pelo "description" pelo campo relevante
  }

  const data = await ItemDAO.getAll(null, filters); // Passa os filtros para o DAO
  return res.status(200).json(data);
};

// Função para buscar um registro pelo ID
const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await ItemDAO.getById(id);

  if (!data) {
    throw new NotFoundError('Item não encontrado!');
  }

  return res.status(200).json(data);
};

// Função para atualizar um registro pelo ID
const update = async (req, res) => {
  const { id } = req.params;
  const data = await ItemDAO.update(id, req.body);

  if (!data) {
    throw new NotFoundError('Item não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Item atualizado com sucesso!',
    data: data,
  });
};

// Função para remover um registro pelo ID
const remove = async (req, res) => {
  const { id } = req.params;
  const data = await ItemDAO.remove(id);

  if (!data) {
    throw new NotFoundError('Item não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Item removido com sucesso!',
    data: data,
  });
};

module.exports = { create, createBatch, getAll, getOne, update, remove };
