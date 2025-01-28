const DAO = require('../../../utils/dao');

class AcaoDAO extends DAO {
  constructor() {
    super('id_acao', 'autenticacao', 'tb_acao');
  }
}

module.exports = new AcaoDAO();
