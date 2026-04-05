const buildSummaryQuery = () => {
  return {
    query: `
      SELECT
        COALESCE(SUM(CASE WHEN fr.type = 'income' THEN fr.amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN fr.type = 'expense' THEN fr.amount ELSE 0 END), 0) AS total_expense,
        COALESCE(SUM(CASE WHEN fr.type = 'income' THEN fr.amount ELSE -fr.amount END), 0) AS net_balance
      FROM "FinancialRecords" fr
      WHERE fr.user_id = :userId
        AND fr.is_deleted = false;
    `,
  };
};

const buildCategoryBreakdownQuery = () => {
  return {
    query: `
      SELECT
        c.id AS category_id,
        c.name AS category_name,
        COALESCE(SUM(fr.amount), 0) AS total_amount,
        COUNT(fr.id)::int AS transaction_count
      FROM "FinancialRecords" fr
      INNER JOIN "Categories" c ON c.id = fr.category_id
      WHERE fr.user_id = :userId
        AND fr.is_deleted = false
        AND c.is_deleted = false
      GROUP BY c.id, c.name
      ORDER BY total_amount DESC, c.name ASC;
    `,
  };
};

const buildTrendsQuery = () => {
  return {
    query: `
      SELECT
        DATE_TRUNC('month', fr.date) AS month,
        COALESCE(SUM(CASE WHEN fr.type = 'income' THEN fr.amount ELSE 0 END), 0) AS income,
        COALESCE(SUM(CASE WHEN fr.type = 'expense' THEN fr.amount ELSE 0 END), 0) AS expense
      FROM "FinancialRecords" fr
      WHERE fr.user_id = :userId
        AND fr.is_deleted = false
      GROUP BY DATE_TRUNC('month', fr.date)
      ORDER BY month DESC;
    `,
  };
};

const buildRecentTransactionsQuery = () => {
  return {
    query: `
      SELECT
        fr.id,
        fr.amount,
        fr.type,
        fr.date,
        fr.notes,
        fr.status,
        c.id AS category_id,
        c.name AS category_name,
        c.description AS category_description
      FROM "FinancialRecords" fr
      INNER JOIN "Categories" c ON c.id = fr.category_id
      WHERE fr.user_id = :userId
        AND fr.is_deleted = false
        AND c.is_deleted = false
      ORDER BY fr.date DESC, fr."createdAt" DESC
      LIMIT 5;
    `,
  };
};

const buildCategoryDetailsQuery = () => {
  return {
    query: `
      SELECT
        c.id AS category_id,
        c.name AS category_name,
        c.description AS category_description,
        COALESCE(SUM(CASE WHEN fr.type = 'income' THEN fr.amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN fr.type = 'expense' THEN fr.amount ELSE 0 END), 0) AS total_expense,
        COALESCE(SUM(CASE WHEN fr.type = 'income' THEN fr.amount ELSE -fr.amount END), 0) AS net_balance,
        COUNT(fr.id)::int AS transaction_count
      FROM "Categories" c
      LEFT JOIN "FinancialRecords" fr
        ON fr.category_id = c.id
        AND fr.user_id = :userId
        AND fr.is_deleted = false
      WHERE c.id = :categoryId
        AND c.is_deleted = false
      GROUP BY c.id, c.name, c.description;
    `,
  };
};

module.exports = {
  buildSummaryQuery,
  buildCategoryBreakdownQuery,
  buildTrendsQuery,
  buildRecentTransactionsQuery,
  buildCategoryDetailsQuery,
};
