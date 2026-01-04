const { query } = require("../utill/dbquery");
const createError = require("../utill/senderror");

const createUser = async (data) => {
  try {
    const result = await query(
      `
      INSERT INTO users (name, email, status)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [data.name, data.email, data.status || "active"]
    );

    return { data: result.rows[0] };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};

const updateUser = async (id, data) => {
  try {
    const result = await query(
      `
      UPDATE users
      SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        status = COALESCE($3, status)
      WHERE id = $4
      RETURNING *
      `,
      [data.name, data.email, data.status, id]
    );

    if (result.rowCount === 0) {
      return { error: createError("User not found", 404) };
    }

    return { data: result.rows[0] };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};

const deleteUser = async (id) => {
  try {
    const result = await query("DELETE FROM users WHERE id = $1 RETURNING id", [
      id,
    ]);

    if (result.rowCount === 0) {
      return { error: createError("User not found", 404) };
    }

    return { data: true };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};

const getUsers = async () => {
  try {
    const result = await query(
      "SELECT id, name, email, status FROM users ORDER BY name ASC"
    );

    return { data: result.rows };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
};
