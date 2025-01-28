const DAO = require('../../../utils/dao');

class colunaDAO extends DAO {
  constructor() {
    super('id_coluna', 'configuracao', 'tb_coluna');
  }
}

module.exports = new colunaDAO();
