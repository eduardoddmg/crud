const DAO = require('../../../utils/dao');

class RegraDAO extends DAO {
  constructor() {
    super('id_regra', 'autenticacao', 'tb_regra');
  }
}

module.exports = new RegraDAO();
