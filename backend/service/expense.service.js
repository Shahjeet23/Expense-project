const { query } = require("../utill/dbquery");
const createError = require("../utill/senderror");

const create = async (data) => {
  try {
    const { user_id, category_id, amount, date, description } = data;

    const userCheck = await query("SELECT id FROM users WHERE id = $1", [
      user_id,
    ]);

    if (userCheck.rowCount === 0) {
      return {
        error: createError("User not found", 404),
      };
    }

    const categoryCheck = await query(
      "SELECT id FROM categories WHERE id = $1",
      [category_id]
    );

    if (categoryCheck.rowCount === 0) {
      return {
        error: createError("Category not found", 404),
      };
    }

    const result = await query(
      `
      INSERT INTO expenses (user_id, category_id, amount, date, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [user_id, category_id, amount, date, description || null]
    );

    return {
      data: result.rows[0],
    };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};

const updateExpense = async (id, data) => {
  try {
    const check = await query("SELECT id FROM expenses WHERE id = $1", [id]);

    if (check.rowCount === 0) {
      return { error: createError("Expense not found", 404) };
    }

    if (data.user_id) {
      const userCheck = await query("SELECT id FROM users WHERE id = $1", [
        data.user_id,
      ]);
      if (userCheck.rowCount === 0) {
        return { error: createError("User not found", 404) };
      }
    }

    if (data.category_id) {
      const categoryCheck = await query(
        "SELECT id FROM categories WHERE id = $1",
        [data.category_id]
      );
      if (categoryCheck.rowCount === 0) {
        return { error: createError("Category not found", 404) };
      }
    }

    const result = await query(
      `
    UPDATE expenses
    SET
      user_id = COALESCE($1, user_id),
      category_id = COALESCE($2, category_id),
      amount = COALESCE($3, amount),
      date = COALESCE($4, date),
      description = COALESCE($5, description)
    WHERE id = $6
    RETURNING *
    `,
      [
        data.user_id,
        data.category_id,
        data.amount,
        data.date,
        data.description,
        id,
      ]
    );

    return { data: result.rows[0] };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};

const deleteExpense = async (id) => {
  try {
    const result = await query(
      "DELETE FROM expenses WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return { error: createError("Expense not found", 404) };
    }

    return { data: true };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};
const getExpenses = async (filters) => {
  try {
    const conditions = [];
    const values = [];
    let index = 1;

    if (filters.user_id) {
      conditions.push(`e.user_id = $${index++}`);
      values.push(filters.user_id);
    }

    if (filters.category_id) {
      conditions.push(`e.category_id = $${index++}`);
      values.push(filters.category_id);
    }

    if (filters.start_date) {
      conditions.push(`e.date >= $${index++}`);
      values.push(filters.start_date);
    }

    if (filters.end_date) {
      conditions.push(`e.date <= $${index++}`);
      values.push(filters.end_date);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const result = await query(
      `
    SELECT
      e.id,
      e.amount,
      e.date,
      e.description,
      e.created_at,
      u.id AS user_id,
      u.name AS user_name,
      c.id AS category_id,
      c.name AS category_name,
      u.email AS user_email
    FROM expenses e
    JOIN users u ON u.id = e.user_id
    JOIN categories c ON c.id = e.category_id
    ${whereClause}
    ORDER BY e.date DESC
    `,
      values
    );

    return { data: result.rows };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};
const Set1 = async () => {
  try {
    const result = await query(`
      SELECT
        u.id AS user_id,
        u.name AS user_name,
        e.date AS expense_date,
        SUM(e.amount) AS total_amount
      FROM expenses e
      JOIN users u ON u.id = e.user_id
      GROUP BY u.id, u.name, e.date
      ORDER BY u.id, total_amount DESC
    `);

    const grouped = {};

    result.rows.forEach((row) => {
      if (!grouped[row.user_id]) {
        grouped[row.user_id] = {
          user_id: row.user_id,
          user_name: row.user_name,
          top_days: [],
        };
      }

      if (grouped[row.user_id].top_days.length < 3) {
        grouped[row.user_id].top_days.push({
          expense_date: row.expense_date,
          total_amount: row.total_amount,
        });
      }
    });

    const finalResult = Object.values(grouped);

    return { data: finalResult };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};
const Set2 = async () => {
  try {
    const result = await query(`
      SELECT
        u.id AS user_id,
        u.name AS user_name,
        DATE_TRUNC('month', e.date) AS month,
        SUM(e.amount) AS total_amount
      FROM expenses e
      JOIN users u ON u.id = e.user_id
      GROUP BY u.id, u.name, DATE_TRUNC('month', e.date)
      ORDER BY u.id, month
    `);

    const grouped = {};

    result.rows.forEach((row) => {
      const userId = row.user_id;

      if (!grouped[userId]) {
        grouped[userId] = {
          user_id: userId,
          user_name: row.user_name,
          months: [],
        };
      }

      grouped[userId].months.push({
        month: row.month,
        total_amount: Number(row.total_amount),
      });
    });

    const finalResult = [];

    Object.values(grouped).forEach((user) => {
      const months = user.months;

      for (let i = 1; i < months.length; i++) {
        const previous = months[i - 1].total_amount;
        const current = months[i].total_amount;

        const percentageChange =
          previous === 0
            ? null
            : Number(((current - previous) / previous) * 100).toFixed(2);

        finalResult.push({
          user_id: user.user_id,
          user_name: user.user_name,
          month: months[i].month,
          current_month_total: current,
          previous_month_total: previous,
          percentage_change: percentageChange,
        });
      }
    });

    return { data: finalResult };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};
const Set3 = async () => {
  try {
    const result = await query(`
      SELECT
        u.id AS user_id,
        u.name AS user_name,
        DATE_TRUNC('month', e.date) AS month,
        SUM(e.amount) AS total_amount
      FROM expenses e
      JOIN users u ON u.id = e.user_id
      GROUP BY u.id, u.name, DATE_TRUNC('month', e.date)
      ORDER BY u.id, month DESC
    `);

    const grouped = {};

    result.rows.forEach((row) => {
      if (!grouped[row.user_id]) {
        grouped[row.user_id] = {
          user_id: row.user_id,
          user_name: row.user_name,
          totals: [],
        };
      }

      grouped[row.user_id].totals.push(Number(row.total_amount));
    });

    const predictions = [];

    Object.values(grouped).forEach((user) => {
      const lastThreeMonths = user.totals.slice(0, 3);

      if (lastThreeMonths.length === 0) return;

      const sum = lastThreeMonths.reduce((a, b) => a + b, 0);
      const average = Number((sum / lastThreeMonths.length).toFixed(2));

      predictions.push({
        user_id: user.user_id,
        user_name: user.user_name,
        predicted_next_month_expense: average,
      });
    });

    return { data: predictions };
  } catch (error) {
    return {
      error: createError(error.detail, 409),
    };
  }
};
module.exports = {
  create,
  updateExpense,
  deleteExpense,
  getExpenses,
  Set1,
  Set2,
  Set3,
};
