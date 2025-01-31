
const DAO = require('../../utils/dao');
class contatoDAO extends DAO {
    constructor() {
        super('id_contato', 'contatos');
    }
}
module.exports = new contatoDAO();
