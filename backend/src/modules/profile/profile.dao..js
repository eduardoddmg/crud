const DAO = require('../../utils/dao');

class ProfileDAO extends DAO {
  constructor() {
    super('id_user', 'users');
  }
}

module.exports = new ProfileDAO();
