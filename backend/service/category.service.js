const { query } = require("../utill/dbquery");
const createError = require("../utill/senderror");

const getCategories = async () => {
  try {
    const result = await query(
      "SELECT id, name FROM categories ORDER BY name ASC"
    );

    return { data: result.rows };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};

const createCategory = async (data) => {
  try {
    const result = await query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [data.name]
    );

    return { data: result.rows[0] };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};

const updateCategory = async (id, data) => {
  try {
    const result = await query(
      `
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
      `,
      [data.name, id]
    );

    if (result.rowCount === 0) {
      return { error: createError("Category not found", 404) };
    }

    return { data: result.rows[0] };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};

const deleteCategory = async (id) => {
  try {
    const result = await query(
      "DELETE FROM categories WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return { error: createError("Category not found", 404) };
    }

    return { data: true };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
};
