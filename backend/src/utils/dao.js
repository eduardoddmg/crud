const { CustomAPIError } = require('../errors');
const { executeQuery, transformEmptyValuesToNull } = require('./crud');

class DAO {
  constructor(primaryKey, schema, table) {
    if (!primaryKey || !schema || !table) {
      throw new CustomAPIError.BadRequestError(
        'primaryKey, schema e table são obrigatórios para a classe DAO.'
      );
    }
    this.primaryKey = primaryKey;
    this.schema = schema;
    this.table = table;
  }

  /**
   * Busca um registro pelo ID.
   * @param {number|string} id - ID do registro.
   * @returns {Promise<Array>} - Registro correspondente ao ID.
   * @throws {BadRequestError} - Se o ID não for fornecido.
   * @example
   * const result = await dao.getById(1);
   * console.log(result); // [{ id: 1, nome: 'Dudu', ... }]
   */
  async getById(id) {
    if (!id) throw new CustomError.BadRequestError('ID não informado!');
    const sql = `SELECT * FROM ${this.schema}.${this.table} WHERE ${this.primaryKey} = $1`;
    return await executeQuery(sql, [id]);
  }

  /**
   * Busca todos os registros, com suporte a filtros e ordenação.
   * @param {Array<string>} [where=[]] - Filtros para a cláusula WHERE.
   * @param {Array<string>} [order=[]] - Ordenação para a cláusula ORDER BY.
   * @returns {Promise<Array>} - Lista de registros.
   * @example
   * const results = await dao.getAll(
   *   ["nome = 'dudu'", "x = 10"],
   *   ["nome ASC", "idade DESC"]
   * );
   * console.log(results); // [{ id: 1, nome: 'Dudu', x: 10, ... }]
   */
  async getAll(view, where = [], order = []) {
    let sql = `SELECT * FROM ${this.schema}.${view ? view : this.table}`;

    // Adiciona cláusulas WHERE, se existirem
    if (where.length > 0) {
      const conditions = where.join(' AND ');
      sql += ` WHERE ${conditions}`;
    }

    // Adiciona cláusula ORDER BY, se existir
    if (order.length > 0) {
      const orderBy = order.join(', ');
      sql += ` ORDER BY ${orderBy}`;
    }

    console.log(sql);

    return await executeQuery(sql);
  }

  /**
   * Busca registros com base em um campo específico.
   * @param {string} field - Nome do campo.
   * @param {string|number} value - Valor do campo.
   * @returns {Promise<Array>} - Lista de registros correspondentes.
   * @example
   * const results = await dao.getByField('nome', 'Dudu');
   * console.log(results); // [{ id: 1, nome: 'Dudu', ... }]
   */
  async getByField(field, value) {
    const sql = `SELECT * FROM ${this.schema}.${this.table} WHERE ${field} = $1`;
    return await executeQuery(sql, [value]);
  }

  /**
   * Cria um novo registro na tabela.
   * @param {Object} data - Dados do novo registro.
   * @returns {Promise<Object>} - Registro criado.
   * @example
   * const result = await dao.create({ nome: 'Dudu', idade: 25 });
   * console.log(result); // { id: 1, nome: 'Dudu', idade: 25, ... }
   */
  async create(data) {
    const transformedData = transformEmptyValuesToNull(data);
    const columns = Object.keys(transformedData).join(', ');
    const values = Object.values(transformedData);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const sql = `INSERT INTO ${this.schema}.${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`;
    return await executeQuery(sql, values);
  }

  /**
   * Insere múltiplos registros na tabela.
   * @param {Array<Object>} dataArray - Array de objetos contendo os dados a serem inseridos.
   * @returns {Promise<Array>} - Lista de registros inseridos.
   * @throws {BadRequestError} - Se o array estiver vazio.
   * @example
   * const results = await dao.createBatch([
   *   { nome: 'Dudu', idade: 25 },
   *   { nome: 'Carlos', idade: 30 }
   * ]);
   * console.log(results); // [{ id: 1, nome: 'Dudu', idade: 25 }, { id: 2, nome: 'Carlos', idade: 30 }]
   */
  async createBatch(dataArray) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      throw new CustomAPIError.BadRequestError(
        'O array de dados está vazio ou inválido!'
      );
    }

    const transformedDataArray = dataArray.map(transformEmptyValuesToNull);

    // Obtém as colunas a partir do primeiro objeto
    const columns = Object.keys(transformedDataArray[0]);

    // Mapeia os valores de cada objeto no array
    const values = [];
    const placeholders = transformedDataArray.map((row, rowIndex) => {
      const rowPlaceholders = Object.values(row)
        .map((_, colIndex) => `$${values.length + colIndex + 1}`)
        .join(', ');

      values.push(...Object.values(row));

      return `(${rowPlaceholders})`;
    });

    // Monta a query final
    const sql = `INSERT INTO ${this.schema}.${this.table} (${columns.join(
      ', '
    )}) 
                   VALUES ${placeholders.join(', ')} 
                   RETURNING *`;

    return await executeQuery(sql, values);
  }
  /**
   * Insere múltiplos registros na tabela.
   * @param {Array<Object>} dataArray - Array de objetos contendo os dados a serem inseridos.
   * @returns {Promise<Array>} - Lista de registros inseridos.
   * @throws {BadRequestError} - Se o array estiver vazio.
   * @example
   * const results = await dao.createBatch([
   *   { nome: 'Dudu', idade: 25 },
   *   { nome: 'Carlos', idade: 30 }
   * ]);
   * console.log(results); // [{ id: 1, nome: 'Dudu', idade: 25 }, { id: 2, nome: 'Carlos', idade: 30 }]
   */
  async createBatch(dataArray) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      throw new CustomAPIError.BadRequestError(
        'O array de dados está vazio ou inválido!'
      );
    }

    const transformedDataArray = dataArray.map(transformEmptyValuesToNull);

    // Obtém as colunas a partir do primeiro objeto
    const columns = Object.keys(transformedDataArray[0]);

    // Mapeia os valores de cada objeto no array
    const values = [];
    const placeholders = transformedDataArray.map((row, rowIndex) => {
      const rowPlaceholders = Object.values(row)
        .map((_, colIndex) => `$${values.length + colIndex + 1}`)
        .join(', ');

      values.push(...Object.values(row));

      return `(${rowPlaceholders})`;
    });

    // Monta a query final
    const sql = `INSERT INTO ${this.schema}.${this.table} (${columns.join(
      ', '
    )}) 
                 VALUES ${placeholders.join(', ')} 
                 RETURNING *`;

    return await executeQuery(sql, values);
  }

  /**
   * Atualiza um registro existente pelo ID.
   * @param {number|string} id - ID do registro.
   * @param {Object} data - Dados atualizados.
   * @returns {Promise<Object>} - Registro atualizado.
   * @throws {BadRequestError} - Se o ID não for fornecido.
   * @example
   * const result = await dao.update(1, { nome: 'Carlos' });
   * console.log(result); // { id: 1, nome: 'Carlos', ... }
   */
  async update(id, data) {
    if (!id) throw new CustomError.BadRequestError('ID não informado!');
    const transformedData = transformEmptyValuesToNull(data);
    const updateSet = Object.keys(transformedData)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    const values = [...Object.values(transformedData), id];

    const sql = `UPDATE ${this.schema}.${this.table} SET ${updateSet} WHERE ${this.primaryKey} = $${values.length} RETURNING *`;
    return await executeQuery(sql, values);
  }

  /**
   * Remove um registro pelo ID.
   * @param {number|string} id - ID do registro.
   * @returns {Promise<Object>} - Registro removido.
   * @throws {BadRequestError} - Se o ID não for fornecido.
   * @example
   * const result = await dao.remove(1);
   * console.log(result); // { id: 1, nome: 'Dudu', ... }
   */
  async remove(id) {
    if (!id) throw new CustomError.BadRequestError('ID não informado!');
    const sql = `DELETE FROM ${this.schema}.${this.table} WHERE ${this.primaryKey} = $1 RETURNING *`;
    return await executeQuery(sql, [id]);
  }

  /**
   * Remove todos os registros da tabela.
   * @returns {Promise<Array>} - Lista de registros removidos.
   * @example
   * const results = await dao.removeAll();
   * console.log(results); // [{ id: 1, ... }, { id: 2, ... }]
   */
  async removeAll() {
    const sql = `DELETE FROM ${this.schema}.${this.table} RETURNING *`;
    return await executeQuery(sql);
  }

  /**
   * Verifica se um registro existe pelo ID.
   * @param {number|string} id - ID do registro.
   * @returns {Promise<boolean>} - True se o registro existir, false caso contrário.
   * @throws {BadRequestError} - Se o ID não for fornecido.
   * @example
   * const exists = await dao.itemExistsById(1);
   * console.log(exists); // true ou false
   */
  async itemExistsById(id) {
    if (!id) throw new CustomError.BadRequestError('ID não informado!');
    const result = await this.getById(id);
    return result.length > 0;
  }

  /**
   * Verifica se um registro existe com base em um campo específico.
   * @param {string} field - Nome do campo.
   * @param {string|number} value - Valor do campo.
   * @returns {Promise<boolean>} - True se o registro existir, false caso contrário.
   * @example
   * const exists = await dao.itemExistsByField('nome', 'Dudu');
   * console.log(exists); // true ou false
   */
  async itemExistsByField(field, value) {
    const result = await this.getByField(field, value);
    return result.length > 0;
  }
}

module.exports = DAO;
