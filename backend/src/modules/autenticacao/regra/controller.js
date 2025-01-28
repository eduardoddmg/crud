const { NotFoundError } = require('../../../errors');
const RegraDAO = require('./dao');

// Função para criar um novo registro
const create = async (req, res) => {
  const data = await RegraDAO.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'Regra criado com sucesso!',
    data,
  });
};

// Função para buscar todos os registros
const getAll = async (req, res) => {
  const data = await RegraDAO.getAll();
  return res.status(200).json({
    success: true,
    message: 'Regras encontrados com sucesso!',
    data,
  });
};

// Função para buscar um registro pelo ID
const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await RegraDAO.getById(id);

  if (!data.length) {
    throw new NotFoundError('Regra não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Regra encontrado com sucesso!',
    data: data[0],
  });
};

// Função para atualizar um registro pelo ID
const update = async (req, res) => {
  const { id } = req.params;
  const data = await RegraDAO.update(id, req.body);

  if (!data.length) {
    throw new NotFoundError('Regra não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Regra atualizado com sucesso!',
    data: data[0],
  });
};

// Função para remover um registro pelo ID
const remove = async (req, res) => {
  const { id } = req.params;
  const data = await RegraDAO.remove(id);

  if (!data.length) {
    throw new NotFoundError('Regra não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Regra removido com sucesso!',
    data: data[0],
  });
};

module.exports = { create, getAll, getOne, update, remove };
