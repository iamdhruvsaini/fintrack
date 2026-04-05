const { QueryTypes } = require("sequelize");
const { FinancialRecord, Category, User, Role, sequelize } = require("../models");
const CrudRepository = require("./crud.repository");
const queries = require("../queries");

const financialRecordCrudRepository = new CrudRepository(FinancialRecord);

const createFinancialRecord = (payload) => {
  return financialRecordCrudRepository.create(payload);
};

const updateFinancialRecordById = (id, payload) => {
  return financialRecordCrudRepository.updateById(id, payload);
};

const findFinancialRecordById = (id) => {
  return financialRecordCrudRepository.getById(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email", "role_id", "status"],
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "description", "status"],
      },
    ],
  });
};

const findFinancialRecordsWithFilters = ({
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
  const { rowsQuery, countQuery, replacements } = queries.buildFinancialRecordsListQuery({
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
  });

  return Promise.all([
    sequelize.query(rowsQuery, {
      replacements,
      type: QueryTypes.SELECT,
    }),
    sequelize.query(countQuery, {
      replacements,
      type: QueryTypes.SELECT,
    }),
  ]).then(([rows, countRows]) => {
    const mappedRows = rows.map((row) => ({
      id: row.id,
      user_id: row.user_id,
      category_id: row.category_id,
      amount: row.amount,
      type: row.type,
      date: row.date,
      notes: row.notes,
      status: row.status,
      is_deleted: row.is_deleted,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      category: {
        id: row.c_id,
        name: row.c_name,
        description: row.c_description,
        status: row.c_status,
      },
    }));

    return {
      rows: mappedRows,
      count: countRows?.[0]?.count || 0,
    };
  });
};

module.exports = {
  createFinancialRecord,
  updateFinancialRecordById,
  findFinancialRecordById,
  findFinancialRecordsWithFilters,
};
