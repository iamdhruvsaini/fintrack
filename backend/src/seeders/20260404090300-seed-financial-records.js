'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('FinancialRecords', [
      {
        id: 1,
        user_id: 3,
        category_id: 1,
        amount: '120000.00',
        type: 'income',
        date: new Date('2026-04-01T10:00:00.000Z'),
        notes: 'Monthly salary',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        user_id: 2,
        category_id: 2,
        amount: '15000.00',
        type: 'income',
        date: new Date('2026-04-02T12:00:00.000Z'),
        notes: 'Freelance project payout',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        user_id: 3,
        category_id: 3,
        amount: '25000.00',
        type: 'expense',
        date: new Date('2026-04-03T08:30:00.000Z'),
        notes: 'Apartment rent',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 4,
        user_id: 1,
        category_id: 4,
        amount: '3000.00',
        type: 'expense',
        date: new Date('2026-04-03T19:15:00.000Z'),
        notes: 'Groceries and food',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('FinancialRecords', {
      id: [1, 2, 3, 4],
    });
  },
};
