const DAO = require('../../../utils/dao');

class ControllerDAO extends DAO {
  constructor() {
    super('id_controller', 'autenticacao', 'tb_controller');
  }
}

module.exports = new ControllerDAO();
