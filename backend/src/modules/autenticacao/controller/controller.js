const { NotFoundError } = require('../../../errors');
const ControllerDAO = require('./dao');
const ColunaDAO = require('../../configuracao/coluna/dao');

// Função para criar um novo registro
const create = async (req, res) => {
  const data = await ControllerDAO.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'Controller criado com sucesso!',
    data,
  });
};

// Função para buscar todos os registros
const getAll = async (req, res) => {
  const data = await ControllerDAO.getAll('vw_autenticacao_controllers_list');

  return res.status(200).json({
    success: true,
    message: 'Controllers encontrados com sucesso!',
    data,
  });
};

// Função para buscar um registro pelo ID
const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await ControllerDAO.getById(id);

  if (!data.length) {
    throw new NotFoundError('Controller não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Controller encontrado com sucesso!',
    data: data[0],
  });
};

// Função para buscar a coluna
const getColuna = async (req, res) => {
  const { id } = req.params;
  const data = await ColunaDAO.getAll(null, [`id_controller = ${id}`]);

  return res.status(200).json({
    success: true,
    message: 'Controller encontrado com sucesso!',
    data: data[0].colunas_json,
  });
};

// Função para atualizar um registro pelo ID
const update = async (req, res) => {
  const { id } = req.params;
  const data = await ControllerDAO.update(id, req.body);

  if (!data.length) {
    throw new NotFoundError('Controller não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Controller atualizado com sucesso!',
    data: data[0],
  });
};

// Função para remover um registro pelo ID
const remove = async (req, res) => {
  const { id } = req.params;
  const data = await ControllerDAO.remove(id);

  if (!data.length) {
    throw new NotFoundError('Controller não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Controller removido com sucesso!',
    data: data[0],
  });
};

module.exports = { create, getAll, getColuna, getOne, update, remove };
