const DAO = require('../../../utils/dao');

class SistemaDAO extends DAO {
  constructor() {
    super('id_sistema', 'autenticacao', 'tb_sistema');
  }
}

module.exports = new SistemaDAO();
