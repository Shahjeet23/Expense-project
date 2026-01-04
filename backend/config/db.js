const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: "postgres",
  database: process.env.DB_NAME || "expense_tracker",
  port: process.env.DB_PORT || 5432,
});

pool.on("connect", () => {
  console.log("db connect");
});

pool.on("error", (err) => {
  console.error("database error", err);
  process.exit(1);
});

module.exports = pool;
