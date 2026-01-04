const pool = require("../config/db");
const query = async (text, params = []) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    if (duration > 500) {
      console.warn(" query:", { text, duration });
    }

    return result;
  } catch (error) {
    console.error("Query Error:", error);
    throw error;
  }
};

const transaction = async (callback) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Transaction failed:", error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  query,
  transaction,
};
