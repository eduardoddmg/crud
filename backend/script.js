const fs = require('fs');
const path = require('path');

function createModule(moduleName) {
    const modulePath = path.join(__dirname, 'src', 'modules', moduleName);

    // Criar diretório se não existir
    if (!fs.existsSync(modulePath)) {
        fs.mkdirSync(modulePath, { recursive: true });
    }

    // Definir conteúdo dos arquivos
    const controllerContent = `
const { NotFoundError } = require("../../errors");
const ${moduleName}DAO = require("./${moduleName}.dao");
const messages = require("./${moduleName}.message");

const create = async (req, res) => {
  req.body.id_usuario = req.user.id;
  const data = await ${moduleName}DAO.create(req.body);
  return res.status(201).json({ success: true, message: messages.CREATED, data });
};

const createBatch = async (req, res) => {
  const { items } = req.body;
  items.forEach(item => item.id_usuario = req.user.id);
  const data = await ${moduleName}DAO.createBatch(items);
  return res.status(201).json({ success: true, message: messages.CREATED_BATCH, data });
};

const getAll = async (req, res) => {
  const { q } = req.query;
  const filters = { id_usuario: req.user.id };
  if (q) {
    filters.name = new RegExp(q, "i");
    filters.description = new RegExp(q, "i");
  }
  const data = await ${moduleName}DAO.getAll(filters);
  return res.status(200).json(data);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await ${moduleName}DAO.getById(id);
  if (!data) throw new NotFoundError(messages.NOT_FOUND);
  return res.status(200).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = await ${moduleName}DAO.update(id, req.body);
  if (!data) throw new NotFoundError(messages.NOT_FOUND);
  return res.status(200).json({ success: true, message: messages.UPDATED, data });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const data = await ${moduleName}DAO.remove(id);
  if (!data) throw new NotFoundError(messages.NOT_FOUND);
  return res.status(200).json({ success: true, message: messages.REMOVED, data });
};

module.exports = { create, createBatch, getAll, getOne, update, remove };
`;

    const daoContent = `
const DAO = require('../../utils/dao');
class ${moduleName}DAO extends DAO {
    constructor() {
        super('id_${moduleName}', '${moduleName}s');
    }
}
module.exports = new ${moduleName}DAO();
`;

    const messageContent = `
const messages = {
    CREATED: '${moduleName} criado com sucesso!',
    CREATED_BATCH: '${moduleName}s criados com sucesso!',
    NOT_FOUND: '${moduleName} não encontrado',
    UPDATED: '${moduleName} atualizado com sucesso',
    REMOVED: '${moduleName} removido com sucesso'
};
module.exports = messages;
`;

    const routeContent = `
const express = require('express');
const { getAll, getOne, create, update, remove, createBatch } = require('./${moduleName}.controller');
const jwtMiddleware = require('../../middlewares/jwt');
const router = express.Router();

router.use(jwtMiddleware);
router.post('/', create);
router.post('/batch', createBatch);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
`;

    const indexPath = path.join(__dirname, 'src', 'modules', 'index.js');
    let indexContent = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';

    if (!indexContent.includes(`const route${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} = require('./${moduleName}/${moduleName}.route');`)) {
        const importStatement = `const route${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} = require('./${moduleName}/${moduleName}.route');\n`;
        indexContent = indexContent.replace(/(const router = express\.Router\(\);\n)/, `$1${importStatement}`);
        indexContent = indexContent.replace(/(module\.exports = router;)/, `router.use('/${moduleName}', route${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)});\n\n$1`);
    }

    // Criar arquivos
    fs.writeFileSync(path.join(modulePath, `${moduleName}.controller.js`), controllerContent);
    fs.writeFileSync(path.join(modulePath, `${moduleName}.dao.js`), daoContent);
    fs.writeFileSync(path.join(modulePath, `${moduleName}.message.js`), messageContent);
    fs.writeFileSync(path.join(modulePath, `${moduleName}.route.js`), routeContent);
    fs.writeFileSync(indexPath, indexContent);
    
    console.log(`Módulo '${moduleName}' criado com sucesso e registrado no roteador principal!`);
}

// Exemplo de uso: node script.js nome_do_modulo
const moduleName = process.argv[2];
if (!moduleName) {
    console.log("Por favor, forneça um nome para o módulo.");
    process.exit(1);
}
createModule(moduleName);
