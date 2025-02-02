const { NotFoundError } = require('../../errors');
const ProfileDAO = require('./profile.dao.');

const getOne = async (req, res) => {
  const { id } = req.user;
  const data = await ProfileDAO.getById(id);

  if (!data) {
    throw new NotFoundError('Item não encontrado');
  }

  return res.status(200).json(data.profile);
};

const update = async (req, res) => {
  const { id } = req.user;
  const data = await ProfileDAO.update(id, req.body);

  if (!data) {
    throw new NotFoundError('Item não encontrado');
  }

  return res.status(200).json(data);
};

module.exports = { getOne, update };
