const { NotFoundError, BadRequestError } = require('../../../errors');
const colunaDAO = require('./dao');

// Função para criar um novo registro
const create = async (req, res) => {
  const data = await colunaDAO.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'coluna criado com sucesso!',
    data,
  });
};

// Função para buscar todos os registros
const getAll = async (req, res) => {
  const { identificador } = req.query;

  const where = identificador && [`identificador LIKE '%${identificador}%'`];
  const data = await colunaDAO.getAll(null, where);

  return res.status(200).json({
    success: true,
    message: 'colunas encontrados com sucesso!',
    data: identificador ? data[0].colunas_json : data,
  });
};

// Função para buscar um registro pelo ID
const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await colunaDAO.getById(id);

  if (!data.length) {
    throw new NotFoundError('coluna não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'coluna encontrado com sucesso!',
    data: data[0],
  });
};

// Função para atualizar um registro pelo ID
const update = async (req, res) => {
  const { id } = req.params;
  const data = await colunaDAO.update(id, req.body);

  if (!data.length) {
    throw new NotFoundError('coluna não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'coluna atualizado com sucesso!',
    data: data[0],
  });
};

// Função para remover um registro pelo ID
const remove = async (req, res) => {
  const { id } = req.params;
  const data = await colunaDAO.remove(id);

  if (!data.length) {
    throw new NotFoundError('coluna não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'coluna removido com sucesso!',
    data: data[0],
  });
};

module.exports = { create, getAll, getOne, update, remove };
