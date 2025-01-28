const DAO = require('../../../utils/dao');

class RegraAcaoDAO extends DAO {
  constructor() {
    super('id_regra_acao', 'autenticacao', 'tb_regra_acao');
  }
}

module.exports = new RegraAcaoDAO();
