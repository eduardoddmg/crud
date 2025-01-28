const { NotFoundError } = require('../../../errors');
const RegraAcaoDAO = require('./dao');

// Função para criar um novo registro
const create = async (req, res) => {
  // Verifique se id_regra e id_acao existem
  const idRegra = req.body.id_regra;
  const idAcao = req.body.id_acao;
  const idController = req.body.id_controller;

  const item = await RegraAcaoDAO.getAll(null, [
    `id_regra = ${idRegra}`,
    `id_acao = ${idAcao}`,
    `id_controller = ${idController}`,
  ]);

  if (item.length) {
    throw new NotFoundError('Associação de regra e ação já existe!');
  }

  const data = await RegraAcaoDAO.create(req.body);
  return res.status(201).json({
    success: true,
    message: 'Associação de regra e ação criado com sucesso!',
    data,
  });
};

// Função para buscar todos os registros
const getAll = async (req, res) => {
  const data = await RegraAcaoDAO.getAll('vw_autenticacao_regras_acoes_list');
  return res.status(200).json({
    success: true,
    message: 'Associação de regra e ação encontrados com sucesso!',
    data,
  });
};

// Função para buscar um registro pelo ID
const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await RegraAcaoDAO.getById(id);

  if (!data.length) {
    throw new NotFoundError('Associação de regra e ação não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Associação de regra e ação encontrado com sucesso!',
    data: data[0],
  });
};

// Função para atualizar um registro pelo ID
const update = async (req, res) => {
  const { id } = req.params;
  const data = await RegraAcaoDAO.update(id, req.body);

  if (!data.length) {
    throw new NotFoundError('Associação de regra e ação não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Associação de regra e ação atualizado com sucesso!',
    data: data[0],
  });
};

// Função para remover um registro pelo ID
const remove = async (req, res) => {
  const { id } = req.params;
  const data = await RegraAcaoDAO.remove(id);

  if (!data.length) {
    throw new NotFoundError('Associação de regra e ação não encontrado!');
  }

  return res.status(200).json({
    success: true,
    message: 'Associação de regra e ação removido com sucesso!',
    data: data[0],
  });
};

module.exports = { create, getAll, getOne, update, remove };
