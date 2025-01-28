const DAO = require('../../utils/dao');

class UserDAO extends DAO {
  constructor() {
    super('id_item', 'public', 'tb_usuario');
  }

  async getByEmail(email) {
    const response = await this.getAll(null, [`email = '${email}'`]);
    return response[0];
  }
}

module.exports = new UserDAO();
