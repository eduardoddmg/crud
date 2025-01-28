const { NotFoundError, BadRequestError } = require('../../../errors');
const SistemaDAO = require('./dao');

// Função para criar um novo registro
const create = async (req, res) => {
  const data = await SistemaDAO.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'Sistema criado com sucesso!',
    data,
  });
};

// Função para buscar todos os registros
const getAll = async (req, res) => {
  const data = await SistemaDAO.getAll();

  return res.status(200).json({
    success: true,
    message: 'Sistemas encontrados com sucesso!',
    data,
  });
};

// Função para buscar um registro pelo ID
const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await SistemaDAO.getById(id);

  if (!data.length) {
    throw new NotFoundError('Sistema não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Sistema encontrado com sucesso!',
    data: data[0],
  });
};

// Função para atualizar um registro pelo ID
const update = async (req, res) => {
  const { id } = req.params;
  const data = await SistemaDAO.update(id, req.body);

  if (!data.length) {
    throw new NotFoundError('Sistema não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Sistema atualizado com sucesso!',
    data: data[0],
  });
};

// Função para remover um registro pelo ID
const remove = async (req, res) => {
  const { id } = req.params;
  const data = await SistemaDAO.remove(id);

  if (!data.length) {
    throw new NotFoundError('Sistema não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Sistema removido com sucesso!',
    data: data[0],
  });
};

module.exports = { create, getAll, getOne, update, remove };
