const buildFinancialRecordsListQuery = ({
  userId,
  categoryId,
  categoryName,
  type,
  status,
  date,
  dateFrom,
  dateTo,
  amount,
  minAmount,
  maxAmount,
  page,
  limit,
}) => {
  const offset = (page - 1) * limit;
  const replacements = {
    userId,
    limit,
    offset,
  };

  let conditions = "fr.is_deleted = false AND fr.user_id = :userId";

  if (categoryId !== undefined) {
    conditions += " AND fr.category_id = :categoryId";
    replacements.categoryId = categoryId;
  }

  if (categoryName !== undefined) {
    conditions += " AND c.name ILIKE :categoryName";
    replacements.categoryName = `%${categoryName}%`;
  }

  if (type !== undefined) {
    conditions += " AND fr.type = :type";
    replacements.type = type;
  }

  if (status !== undefined) {
    conditions += " AND fr.status = :status";
    replacements.status = status;
  }

  if (date !== undefined) {
    conditions += " AND DATE(fr.date) = :date";
    replacements.date = date;
  }

  if (dateFrom !== undefined) {
    conditions += " AND DATE(fr.date) >= :dateFrom";
    replacements.dateFrom = dateFrom;
  }

  if (dateTo !== undefined) {
    conditions += " AND DATE(fr.date) <= :dateTo";
    replacements.dateTo = dateTo;
  }

  if (amount !== undefined) {
    conditions += " AND fr.amount = :amount";
    replacements.amount = amount;
  } else {
    if (minAmount !== undefined) {
      conditions += " AND fr.amount >= :minAmount";
      replacements.minAmount = minAmount;
    }

    if (maxAmount !== undefined) {
      conditions += " AND fr.amount <= :maxAmount";
      replacements.maxAmount = maxAmount;
    }
  }

  return {
    rowsQuery: `
      SELECT
        fr.id,
        fr.user_id,
        fr.category_id,
        fr.amount,
        fr.type,
        fr.date,
        fr.notes,
        fr.status,
        fr.is_deleted,
        fr."createdAt",
        fr."updatedAt",
        c.id AS c_id,
        c.name AS c_name,
        c.description AS c_description,
        c.status AS c_status
      FROM "FinancialRecords" fr
      INNER JOIN "Categories" c ON c.id = fr.category_id
      WHERE ${conditions}
      ORDER BY fr.date DESC, fr."createdAt" DESC
      LIMIT :limit OFFSET :offset;
    `,
    countQuery: `
      SELECT COUNT(*)::int AS count
      FROM "FinancialRecords" fr
      INNER JOIN "Categories" c ON c.id = fr.category_id
      WHERE ${conditions};
    `,
    replacements,
  };
};

module.exports = {
  buildFinancialRecordsListQuery,
};
