const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

class DAO {
  constructor(primaryKey, table) {
    if (!primaryKey || !table)
      throw new Error('primaryKey e table são obrigatórios.');

    this.primaryKey = primaryKey;
    this.table = table;
    this.dbPath = path.join(__dirname, 'db', `${this.table}.json`);

    if (!fs.existsSync(path.dirname(this.dbPath)))
      fs.mkdirSync(path.dirname(this.dbPath));
    if (!fs.existsSync(this.dbPath))
      fs.writeFileSync(this.dbPath, JSON.stringify([]));
  }

  _readDB() {
    return JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
  }

  _writeDB(data) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  async getById(id) {
    return _.find(this._readDB(), { [this.primaryKey]: id }) || null;
  }

  async getAll(filters = {}) {
    return _.filter(this._readDB(), filters);
  }

  async create(data) {
    const records = this._readDB();
    const newRecord = { ...data, [this.primaryKey]: uuidv4() };
    records.push(newRecord);
    this._writeDB(records);
    return newRecord;
  }

  async createBatch(dataArray) {
    if (!Array.isArray(dataArray) || _.isEmpty(dataArray))
      throw new Error('Array inválido!');

    const records = this._readDB();
    const newRecords = dataArray.map((data) => ({
      ...data,
      [this.primaryKey]: uuidv4(),
    }));
    records.push(...newRecords);
    this._writeDB(records);
    return newRecords;
  }

  async update(id, data) {
    let records = this._readDB();
    const index = _.findIndex(records, { [this.primaryKey]: id });
    if (index === -1) return null;

    records[index] = { ...records[index], ...data };
    this._writeDB(records);
    return records[index];
  }

  async remove(id) {
    const records = this._readDB();
    const filteredRecords = _.reject(records, { [this.primaryKey]: id });
    if (filteredRecords.length === records.length) return null;

    this._writeDB(filteredRecords);
    return true;
  }

  async removeAll() {
    this._writeDB([]);
    return true;
  }

  async itemExistsById(id) {
    return !!_.find(this._readDB(), { [this.primaryKey]: id });
  }

  async itemExistsByField(field, value) {
    return !_.isEmpty(_.filter(this._readDB(), { [field]: value }));
  }
}

module.exports = DAO;
