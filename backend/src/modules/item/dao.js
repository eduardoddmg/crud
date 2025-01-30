const DAO = require('../../utils/dao');

class ItemDAO extends DAO {
  constructor() {
    super('id_item', 'items');
  }
}

module.exports = new ItemDAO();
