const DAO = require('../../utils/dao');

class ItemDAO extends DAO {
  constructor() {
    super('id_item', 'public', 'tb_item');
  }
}

module.exports = new ItemDAO();
