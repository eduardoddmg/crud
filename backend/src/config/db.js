const { db, pool } = require("./index");

pool.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao Postgre:", err);
  } else {
    console.log("Conectado ao PostgreSQL");
  }
});
