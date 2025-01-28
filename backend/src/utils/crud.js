const { pool } = require('../config');

const CustomError = require('../errors');

const executeQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const getById = ({ schema, table, name_id, id }) => {
  if (!id) throw new CustomError.BadRequestError('ID não informado!');
  const sql = `SELECT * FROM ${schema}.${table} WHERE ${name_id} = $1`;
  return executeQuery(sql, [id]);
};

const getByField = ({ schema, table, field, value }) => {
  const sql = `SELECT * FROM ${schema}.${table} WHERE ${field} = $1`;
  return executeQuery(sql, [value]);
};

const transformEmptyValuesToNull = (data) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === '' ? null : value,
    ])
  );
};

const getAll = ({ schema, table }) => {
  const sql = `SELECT * FROM ${schema}.${table}`;
  return executeQuery(sql);
};

const create = ({ schema, table, data }) => {
  const transformedData = transformEmptyValuesToNull(data);
  const columns = Object.keys(transformedData).join(', ');
  const values = Object.values(transformedData);
  const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

  const sql = `INSERT INTO ${schema}.${table} (${columns}) VALUES (${placeholders}) RETURNING *`;

  return executeQuery(sql, values);
};

const update = ({ schema, table, name_id, id, data }) => {
  const transformedData = transformEmptyValuesToNull(data);
  const updateSet = Object.keys(transformedData)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');
  const values = [...Object.values(transformedData), id];

  const sql = `UPDATE ${schema}.${table} SET ${updateSet} WHERE ${name_id} = $${values.length} RETURNING *`;

  return executeQuery(sql, values);
};

const remove = ({ schema, table, field, id }) => {
  const sql = `DELETE FROM ${schema}.${table} WHERE ${field} = $1 RETURNING *`;
  console.log(sql);
  return executeQuery(sql, [id]);
};

const removeAll = ({ schema, table }) => {
  const sql = `DELETE FROM ${schema}.${table} RETURNING *`;
  return executeQuery(sql);
};

const itemExistsById = async (params) => {
  const result = await getById(params);
  return result.length > 0;
};

const itemExistsByField = async (params) => {
  const result = await getByField(params);
  return result.length > 0;
};

module.exports = {
  executeQuery,
  getAll,
  getById,
  getByField,
  create,
  update,
  remove,
  removeAll,
  itemExistsById,
  itemExistsByField,
  transformEmptyValuesToNull,
};
