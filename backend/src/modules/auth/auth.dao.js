const DAO = require('../../utils/dao');

class UserDAO extends DAO {
  constructor() {
    super('id_user', 'users');
  }

  async getByEmail(email) {
    const response = await this.getAll({ email });
    return response[0];
  }
}

module.exports = new UserDAO();
