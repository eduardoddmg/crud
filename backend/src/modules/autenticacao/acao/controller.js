const { NotFoundError } = require('../../../errors');
const AcaoDAO = require('./dao');

// Função para criar um novo registro
const create = async (req, res) => {
  const data = await AcaoDAO.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'Acoes criado com sucesso!',
    data,
  });
};

// Função para buscar todos os registros
const getAll = async (req, res) => {
  const data = await AcaoDAO.getAll();
  return res.status(200).json({
    success: true,
    message: 'Acoes encontrados com sucesso!',
    data,
  });
};

// Função para buscar um registro pelo ID
const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await AcaoDAO.getById(id);

  if (!data.length) {
    throw new NotFoundError('Acoes não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Acoes encontrado com sucesso!',
    data: data[0],
  });
};

// Função para atualizar um registro pelo ID
const update = async (req, res) => {
  const { id } = req.params;
  const data = await AcaoDAO.update(id, req.body);

  if (!data.length) {
    throw new NotFoundError('Acoes não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Acoes atualizado com sucesso!',
    data: data[0],
  });
};

// Função para remover um registro pelo ID
const remove = async (req, res) => {
  const { id } = req.params;
  const data = await AcaoDAO.remove(id);

  if (!data.length) {
    throw new NotFoundError('Acoes não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Acoes removido com sucesso!',
    data: data[0],
  });
};

module.exports = { create, getAll, getOne, update, remove };
