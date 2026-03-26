const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "senacrs",
  database: "serpex"
});

connection.connect((err: any) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err);
    return;
  }
  console.log("Conectado ao banco de dados!");
});

module.exports = connection;