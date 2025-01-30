const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class DAO {
  constructor(primaryKey, table) {
    if (!primaryKey || !table) {
      throw new Error('primaryKey e table são obrigatórios para a classe DAO.');
    }
    this.primaryKey = primaryKey;
    this.table = table;
    this.dbPath = path.join(__dirname, 'db', `${this.table}.json`);

    if (!fs.existsSync(path.join(__dirname, 'db'))) {
      fs.mkdirSync(path.join(__dirname, 'db'));
    }
    if (!fs.existsSync(this.dbPath)) {
      fs.writeFileSync(this.dbPath, JSON.stringify([]));
    }
  }

  _readDB() {
    return JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
  }

  _writeDB(data) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  async getById(id) {
    const records = this._readDB();
    console.log(records, id);
    return records.find((record) => record[this.primaryKey] === id) || null;
  }

  async getAll(filters = {}) {
    let records = this._readDB();

    // Aplica os filtros dinamicamente
    for (const key in filters) {
      records = records.filter((record) => record[key] === filters[key]);
    }

    return records;
  }

  async getByField(field, value) {
    return this._readDB().filter((record) => record[field] === value);
  }

  async create(data) {
    const records = this._readDB();
    const newRecord = { ...data, [this.primaryKey]: uuidv4() };
    records.push(newRecord);
    this._writeDB(records);
    return newRecord;
  }

  async createBatch(dataArray) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      throw new Error('O array de dados está vazio ou inválido!');
    }
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
    const records = this._readDB();
    const index = records.findIndex((record) => record[this.primaryKey] === id);
    if (index === -1) return null;
    records[index] = { ...records[index], ...data };
    this._writeDB(records);
    return records[index];
  }

  async remove(id) {
    const records = this._readDB();
    const filteredRecords = records.filter(
      (record) => record[this.primaryKey] !== id
    );
    if (filteredRecords.length === records.length) return null;
    this._writeDB(filteredRecords);
    return true;
  }

  async removeAll() {
    this._writeDB([]);
    return true;
  }

  async itemExistsById(id) {
    return !!(await this.getById(id));
  }

  async itemExistsByField(field, value) {
    return (await this.getByField(field, value)).length > 0;
  }
}

module.exports = DAO;
